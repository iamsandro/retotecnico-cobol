import { CLI_MESSAGES, prompt } from "./constants/cli_messages";
import { ParserCSV } from "./parcerCSV";
import { ReportGenerator } from "./reportGenerator";
import { TransactionDataAnalyzer } from "./transactionDataAnalyzer";
import inquirer from "inquirer";
import { ErrorTransaction, Transaction } from "./types";
import fs from "fs";
import { FIELDS, TRANSACTION_TYPES } from "./constants/constantVariable";

/**
 * * Clase para manejar la interfaz de línea de comandos (CLI) de forma interactiva.
 * * Permite al usuario ingresar la ruta de un archivo CSV y genera un reporte basado en los datos de transacciones.
 * * * Ejemplo de uso:
 * * const cli = new InteractiveCLI();
 * * cli.run();
 * */
export class CLI {
  private async questionsPrompt(): Promise<Transaction[] | undefined> {
    let data: any;
    const question_all = [
      {
        type: "input",
        name: "filepath",
        message: prompt.filePath.message,
        validate: (input: string) => {
          if (!input.trim()) return CLI_MESSAGES.EMPTY_ROUTE;
          if (!input.endsWith(".csv")) return CLI_MESSAGES.WRONG_ROUTE;
          if (!fs.existsSync(input)) return CLI_MESSAGES.FILE_NOT_FOUND;
          return true;
        },
      },
      {
        type: "list",
        name: "action",
        message: CLI_MESSAGES.WHAT_TO_DO,
        choices: [
          CLI_MESSAGES.OMIT_ERRORS,
          CLI_MESSAGES.CORRECT_ERRORS,
          CLI_MESSAGES.EXIT,
        ],
        when: (response: any) => {
          data = ParserCSV(response.filepath);
          return data.errors?.length > 0 ? true : false;
        },
      },
      {
        type: "list",
        name: "second_action",
        message: CLI_MESSAGES.WHAT_TO_DO,
        choices: [CLI_MESSAGES.CORRECT_ALL, CLI_MESSAGES.CHOOSE_WHICH_ONES],
        when: (response: any) => {
          return response.action === CLI_MESSAGES.CORRECT_ERRORS ? true : false;
        },
      },
      {
        type: "checkbox",
        name: "fields",
        message: CLI_MESSAGES.SELECT_FIELDS_TO_EDIT,
        choices: () => {
          return data.errors.map((error: any) => ({
            name: `${error.id}|${error.tipo}|${error.monto}`,
            value: error.id,
            checked: false,
          }));
        },
        when: (response: any) => {
          return response.second_action === CLI_MESSAGES.CHOOSE_WHICH_ONES
            ? true
            : false;
        },
      },
    ];

    const response_all = await inquirer.prompt(question_all as any);

    if (response_all.second_action === CLI_MESSAGES.CHOOSE_WHICH_ONES) {
      const errors_to_correct = data.errors.filter((error: Transaction) =>
        response_all.fields.includes(error.id),
      );

      const transactions_corrected = await this.editPrompt(errors_to_correct);

      return [...data.transactions, ...transactions_corrected];
    }

    if (response_all.second_action === CLI_MESSAGES.CORRECT_ALL) {
      const transactions_corrected = await this.editPrompt(data.errors);

      return [...data.transactions, ...transactions_corrected];
    }

    if (response_all.action === CLI_MESSAGES.OMIT_ERRORS)
      return data.transactions;

    return undefined;
  }

  private async editPrompt(errors: ErrorTransaction[]): Promise<Transaction[]> {
    const correctedErrors = [];

    for (const error of errors) {
      console.log(CLI_MESSAGES.ERROR_EDIT);
      console.table({
        ID: error.id,
        Monto: error.monto,
        Tipo: error.tipo,
        error: error.error_field,
      });

      const variablesToChange = error.error_field?.reduce(
        (acc: any[], field: string) => {
          acc = [
            ...acc,
            {
              type: "input",
              name: field,
              message: CLI_MESSAGES.EDIT + " " + field,
              default: error[field as keyof ErrorTransaction],
              validate: (input: string) => {
                if (
                  field === FIELDS.TYPE &&
                  !TRANSACTION_TYPES.includes(input)
                ) {
                  return CLI_MESSAGES.INCORRECT_TRANSACTION_TYPE;
                }
                if (
                  field === FIELDS.AMOUNT &&
                  (!/^\d+(\.\d+)?$/.test(input) || parseFloat(input) <= 0)
                ) {
                  return CLI_MESSAGES.INCORRECT_TRANSACTION_AMOUNT;
                }
                return true;
              },
            },
          ];

          return acc;
        },
        [],
      );

      const updatedFields = await inquirer.prompt(variablesToChange as any);
      const correctedError = { ...error, ...updatedFields };
      correctedErrors.push(correctedError);
    }

    return correctedErrors;
  }

  // funcion para procesar el archivo csv y generar el reporte
  private async handleTransactionProcessing(): Promise<void> {
    let shouldActive = true;
    while (shouldActive) {
      try {
        const data = await this.questionsPrompt();

        // const correctedTransactions = await this.editPrompt(data.errors);

        if (data) {
          // analizar los datos de transacciones
          const transactions = new TransactionDataAnalyzer(data);
          // generar el reporte
          const report = ReportGenerator.generateReport(transactions);
          // mostrar el reporte en consola
          console.log(report);
        } else {
          shouldActive = false;
          return;
        }
      } catch (error: any) {
        console.error(error.message);
      }
      shouldActive = await this.askToContinue();
    }
  }

  // funcion para preguntar si el usuario quiere continuar
  // y procesar otro archivo csv
  private async askToContinue(): Promise<boolean> {
    const { continue: userWantsToContinue } = await inquirer.prompt({
      type: "confirm",
      name: "continue",
      message: CLI_MESSAGES.CONTINUE,
    });
    return userWantsToContinue;
  }

  // funcion para ejecutar la aplicacion
  // y mostrar el mensaje de bienvenida y despedida
  public async run(): Promise<void> {
    console.clear();
    console.log(CLI_MESSAGES.WELCOME);
    console.log(CLI_MESSAGES.LINE_DOUBLE);

    await this.handleTransactionProcessing();

    console.log(CLI_MESSAGES.LINE_DOUBLE);
    console.log(CLI_MESSAGES.GOODBYE);
  }
}
