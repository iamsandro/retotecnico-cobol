import { CLI_MESSAGES, prompt } from "./constants/cli_messages";
import { ParserCSV } from "./parcerCSV";
import { ReportGenerator } from "./reportGenerator";
import { TransactionDataAnalyzer } from "./transactionDataAnalyzer";
import inquirer from "inquirer";

/**
 * * Clase para manejar la interfaz de línea de comandos (CLI) de forma interactiva.
 * * Permite al usuario ingresar la ruta de un archivo CSV y genera un reporte basado en los datos de transacciones.
 * * * Ejemplo de uso:
 * * const cli = new InteractiveCLI();
 * * cli.run();
 * */
export class CLI {
  // funcion para obtener la ruta del archivo
  // y validar que se ingrese una ruta de un archivo csv
  private async getFilePath(): Promise<string> {
    const { filePath } = await inquirer.prompt({
      type: "input",
      name: "filePath",
      message: prompt.filePath.message,
      validate: (input: string) => {
        if (!input.trim()) return CLI_MESSAGES.EMPTY_ROUTE;
        if (!input.endsWith(".csv")) return CLI_MESSAGES.WRONG_ROUTE;
        return true;
      },
    });
    return filePath;
  }

  // funcion para procesar el archivo csv y generar el reporte
  private handleTransactionProcessing(filePath: string): void {
    try {
      // parsear el archivo csv
      const data = ParserCSV(filePath);
      // analizar los datos de transacciones
      const transactions = new TransactionDataAnalyzer(data);
      // generar el reporte
      const report = ReportGenerator.generateReport(transactions);
      // mostrar el reporte en consola
      console.log(report);
    } catch (error: any) {
      console.error(error.message);
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
    console.log(CLI_MESSAGES.WELCOME);
    console.log(CLI_MESSAGES.LINE_DOUBLE);

    let shouldContinue = true;
    while (shouldContinue) {
      const filePath = await this.getFilePath();
      this.handleTransactionProcessing(filePath);
      shouldContinue = await this.askToContinue();
    }

    console.log(CLI_MESSAGES.GOODBYE);
  }
}
