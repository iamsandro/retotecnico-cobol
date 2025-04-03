import fs from "fs";
import { parse } from "csv-parse/sync";
import { ErrorTransaction, ParsedData, Transaction } from "./types";
import { ERROR_MESSAGES } from "./constants/errors_messages";
import { FIELDS } from "./constants/constantVariable";

/**
 * Función que recibe la ruta de un archivo CSV y devuelve un array de transacciones.
 * @param filePath Ruta del archivo CSV.
 * @returns Array de transacciones.
 */
export function ParserCSV(filePath: string): ParsedData {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    // Parsear el contenido del archivo CSV, nos devuelve un array de objetos
    // donde cada objeto representa una fila del CSV y las claves son los encabezados de columna.
    const records = parse(content, {
      columns: true, // usa la primera fila como encabezados de columna
      skip_empty_lines: true, // omite líneas vacías
      trim: true, // elimina espacios en blanco al inicio y al final de cada campo
      delimiter: [",", ";", "|"], // especifica los delimitadores de columnas permitidos
    }) as Transaction[];

    // Verifica si el archivo CSV está vacío o no tiene registros
    // Si no hay registros, lanza un error
    if (records.length === 0) {
      throw new Error(ERROR_MESSAGES.EMPTY_CSV);
    } else {
      const errorRecords: ErrorTransaction[] = records.reduce(
        (acc: ErrorTransaction[], record: Transaction, index: number) => {
          let hasError = false;
          let errors: Array<string> = [];

          // Verifica si el registro tiene la propiedad "tipo" requerida
          if (!["Crédito", "Débito"].includes(record.tipo)) {
            acc.push({
              ...record,
              indice: index,
              error_field: [...errors, FIELDS.TYPE],
            });
            hasError = true;
          }

          // Verifica si el registro tiene la propiedad "monto" requerida (tipo numérico)
          if (isNaN(Number(record.monto)) || +record.monto < 0) {
            acc.push({
              ...record,
              indice: index,
              error_field: [...errors, FIELDS.AMOUNT],
            });
            hasError = true;
          }

          // Verifica si el registro tiene la propiedad "id" requerida (tipo numérico)
          if (isNaN(Number(record.id))) {
            acc.push({
              ...record,
              indice: index,
              error_field: [...errors, FIELDS.ID],
            });
            hasError = true;
          }

          // Si el registro tiene algún error, lo eliminamos del array records
          if (hasError) {
            records.splice(index, 1);
          }

          return acc;
        },
        [],
      );

      return { transactions: records, errors: errorRecords };
    }
  } catch (error: any) {
    throw new Error(`Error 😖: ${error.ENOENT || error.message || error}`);
  }
}
