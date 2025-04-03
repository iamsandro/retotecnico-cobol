import { Transaction, TransactionCounts } from "../types";

export const CLI_MESSAGES = {
  WELCOME: "¡Hola! Soy tu asistente de Balance 💹",
  REMEMBER:
    "Recuerda que el archivo debe ser un CSV con las columnas: id, tipo, monto.",
  CONTINUE: "¿Quieres continuar?",
  WHAT_TO_DO: "¿Qué deseas hacer?",
  ASK_FOR_FILE_PATH:
    "Por favor, ingresa la ruta del archivo. Ejemplo: ./data/transactions.csv",
  REATTEMP: "¿Quieres intentar nuevamente?",
  EMPTY_ROUTE: "Por favor, sube la ruta del archivo.",
  WRONG_ROUTE: "El archivo no es un CSV.",
  INCORRECT_TRANSACTION_TYPE:
    "El tipo de transacción debe ser Débito o Crédito 😪",
  INCORRECT_TRANSACTION_AMOUNT: "El monto es un valor númérico positivo 😪",
  SELECT_FIELDS_TO_EDIT: "Seleccionas las transacciones a modificar",
  FILE_DOESNT_EXIST: "El archivo no existe.",
  CORRECT_ALL: "Corregir todos",
  CHOOSE_WHICH_ONES: "Escoger",
  YES: "Sí",
  NO: "No",
  GOODBYE: "¡Hasta luego! 👋",
  LINE: "----------------------------------------",
  LINE_DOUBLE: "«═══════════════════════════════════════════════════»",
  CORRECT_ERRORS: "Corregir errores",
  EXIT: "Salir",
  OMIT_ERRORS: "Omitir errores, no se considerará esta transacción",
  EDIT: "Editar el campo",
  EDIT_AMOUNT: "Edita el monto de la transacción",
  EDIT_TYPE: "Edita el tipo de la transacción",
  EDIT_ID: "Edita el id de la transacción",
  ERROR_EDIT: "Edición de errores",
  FILE_NOT_FOUND: "Archivo no encontrado",
  REPORT: (
    finalBalance: number,
    highestTransaction: Transaction,
    transactionCounts: TransactionCounts,
  ) => `
            Reporte de Transacciones:
            -------------------------
            Balance Final: ${finalBalance}
            Transacción de Mayor Monto: ID ${highestTransaction?.id} - ${highestTransaction?.monto})
            Conteo de Transacciones por Tipo: Crédito: ${transactionCounts.Crédito} Débito: ${transactionCounts.Débito}
        `,
};

export const prompt = {
  filePath: {
    message:
      "Por favor, sube la ruta del archivo (Ejemplo: ./data/transactions.csv):",
    validate: (input: string) => {
      if (!input) {
        return "La ruta del archivo no puede estar vacía.";
      }
      if (!input.endsWith(".csv")) {
        return "El archivo debe ser un CSV.";
      }
      return true;
    },
  },
};
