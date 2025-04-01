import fs from "fs";
import { parse } from "csv-parse/sync";
import { Transaction } from "./types";
import { ERROR_MESSAGES } from "./constants/errors_messages";

/**
 * Función que recibe la ruta de un archivo CSV y devuelve un array de transacciones.
 * @param filePath Ruta del archivo CSV.
 * @returns Array de transacciones.
 */
export function ParserCSV(filePath: string): Transaction[] {
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
      records.forEach((record: Transaction, index: number) => {
        // Verifica si el registro tiene la propiedad "tipo" requerida
        if (!["Crédito", "Débito"].includes(record.tipo)) {
          throw new Error(ERROR_MESSAGES.INVALID_TYPE(index, record));
        }

        // Verifica si el registro tiene la propiedad "monto" requerida (tipo numérico)
        if (isNaN(Number(record.monto)))
          throw new Error(ERROR_MESSAGES.INVALID_AMOUNT(index, record));

        // Verfica si el monto no sea negativo
        if (record.monto < 0)
          throw new Error(ERROR_MESSAGES.NEGATIVE_AMOUNT(index, record));

        // Verifica si el registro tiene la propiedad "id" requerida (tipo numérico)
        if (isNaN(Number(record.id)))
          throw new Error(ERROR_MESSAGES.INVALID_ID(index, record));
      });
    }

    return records;
  } catch (error: any) {
    throw new Error(`Error 😖: ${error.ENOENT || error.message || error}`);
  }
}
