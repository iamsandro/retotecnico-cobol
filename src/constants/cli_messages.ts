import { Transaction, TransactionCounts } from "../types";

export const CLI_MESSAGES = {
  WELCOME: "¡Hola! Soy tu asistente de Balance 💹",
  REMEMBER:
    "Recuerda que el archivo debe ser un CSV con las columnas: id, tipo, monto.",
  CONTINUE: "¿Quieres continuar?",
  WHAT_TO_DO: "¿Qué deseas hacer?",
  ASK_FOR_FILE_PATH:
    "Por favor, sube la ruta del archivo. Ejemplo: ./data/transactions.csv",
  REATTEMP: "¿Quieres intentar nuevamente?",
  EMPTY_ROUTE: "Por favor, sube la ruta del archivo.",
  WRONG_ROUTE: "El archivo no es un CSV.",
  FILE_DOESNT_EXIST: "El archivo no existe.",
  YES: "Sí",
  NO: "No",
  GOODBYE: "¡Hasta luego! 👋",
  LINE: "----------------------------------------",
  LINE_DOUBLE: "«═══════════════════════════════════════════════════»",

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
