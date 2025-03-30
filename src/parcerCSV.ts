import fs from "fs";
import { parse } from "csv-parse/sync";
import { Transaction } from "./types";

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
        }) as Transaction[];

        // Verifica si el archivo CSV está vacío o no tiene registros
        // Si no hay registros, lanza un error
        if (records.length === 0) {
            throw new Error(
                "Archivo CSV vacío. Por favor, verifica el archivo.",
            );
        } else {
            records.forEach((record: Transaction, index: number) => {
                // Verifica si el registro tiene la propiedad "tipo" requerida
                if (!["Crédito", "Débito"].includes(record.tipo)) {
                    throw new Error(
                        `Tipo de transacción inválido en la fila ${
                            index + 1
                        }: ${record.tipo}.`,
                    );
                }

                // Verifica si el registro tiene la propiedad "monto" requerida (tipo numérico)
                if (isNaN(Number(record.monto)))
                    throw new Error(
                        `Monto inválido en la fila ${index + 1}: ${
                            record.monto
                        }.`,
                    );

                // Verfica si el monto no sea negativo
                if (record.monto < 0)
                    throw new Error(
                        `Monto negativo en la fila ${index + 1}: ${
                            record.monto
                        }.`,
                    );

                // Verifica si el registro tiene la propiedad "id" requerida (tipo numérico)
                if (isNaN(Number(record.id)))
                    throw new Error(
                        `ID inválido en la fila ${index + 1}: ${record.id}.`,
                    );
            });
        }

        return records;
    } catch (error) {
        console.error(
            "Error al intentar decodificar el archivo CSV 😖:",
            error,
        );
        return [];
    }
}
