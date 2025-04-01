import { Transaction } from "../types";

export const ERROR_MESSAGES = {
    EMPTY_CSV: "El archivo CSV está vacío. Por favor, verifica el archivo.",
    INVALID_TYPE: (index: number, record: Transaction) =>`Tipo de transacción inválido en la fila ${
        index + 1
    }: ${record.tipo}.`,
    INVALID_AMOUNT: (index: number, record: Transaction) => `Monto inválido en la fila ${index + 1}: ${
        record.monto
    }.`,
    INVALID_ID: (index: number, record: Transaction) => `ID inválido en la fila ${index + 1}: ${
        record.id
    }.`,
    NEGATIVE_AMOUNT: (index: number, record: Transaction) =>  `Monto negativo en la fila ${index + 1}: ${
        record.monto
    }.`,
};
