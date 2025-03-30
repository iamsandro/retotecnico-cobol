import { ParserCSV } from "../parcerCSV";
import fs from "fs";

describe("ParcerCSV", () => {
    const textFilePath = "src/__tests__/__mocks__/test.csv";
    const textFilePathInvalidID = "src/__tests__/__mocks__/testInvalidID.csv";
    const textFilePathInvalidType =
        "src/__tests__/__mocks__/testInvalidType.csv";
    const textFilePathInvalidAmount =
        "src/__tests__/__mocks__/testInvalidAmount.csv";

    beforeAll(() => {
        // Crear un archivo CSV de prueba
        const csvContentValid = `id,tipo,monto\n1,Crédito,100\n2,Débito,50\n3,Crédito,200`;
        const csvContentInValidType = `id,tipo,monto\n1,Crédito,100\n2,Débito,50\n3,Cérdito,200`;
        const csvContentInValidID = `id,tipo,monto\n1,Crédito,100\nz,Débito,50\n3,Crédito,200`;
        const csvContentInValidAmount = `id,tipo,monto\n1,Crédito,a\n2,Débito,50\n3,Crédito,200`;

        fs.writeFileSync(textFilePath, csvContentValid, "utf8");
        fs.writeFileSync(textFilePathInvalidID, csvContentInValidID, "utf8");
        fs.writeFileSync(
            textFilePathInvalidType,
            csvContentInValidType,
            "utf8",
        );
        fs.writeFileSync(
            textFilePathInvalidAmount,
            csvContentInValidAmount,
            "utf8",
        );
    });

    afterAll(() => {
        // Eliminar el archivo CSV de prueba después de las pruebas
        fs.unlinkSync(textFilePath);
    });

    it("Debe parsear correctamente un CSV válido y retornar un array de transacciones", () => {
        const result = ParserCSV(textFilePath);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({ id: "1", tipo: "Crédito", monto: "100" });
        expect(result[1]).toEqual({ id: "2", tipo: "Débito", monto: "50" });
        expect(result[2]).toEqual({ id: "3", tipo: "Crédito", monto: "200" });
    });

    it("Debe lanzar un error si el archivo no existe", () => {
        const invalidFilePath = "src/__tests__/__mocks__/invalid.csv";
        expect(() => ParserCSV(invalidFilePath)).toThrowError(
            "Error 😖: El archivo CSV no existe. Verifica la ruta.",
        );
    });

    it("Debe lanzar un error si el archivo CSV está vacío", () => {
        const emptyFilePath = "src/__tests__/__mocks__/emptyFile.csv";
        fs.writeFileSync(emptyFilePath, "", "utf8");

        expect(() => ParserCSV(emptyFilePath)).toThrowError(
            "Error 😖: Archivo CSV vacío. Por favor, verifica el archivo.",
        );
    });

    it("Debe lanzar un error si el archivo CSV no tiene registros", () => {
        const emptyFilePath = "src/__tests__/__mocks__/empty.csv";
        fs.writeFileSync(emptyFilePath, "", "utf8");

        expect(() => ParserCSV(emptyFilePath)).toThrowError(
            "Error 😖: Archivo CSV vacío. Por favor, verifica el archivo.",
        );
    });

    it("Debe lanzar un error si el tipo de transacción de un registro es inválido", () => {
        expect(() => ParserCSV(textFilePathInvalidType)).toThrowError(
            "Error 😖: Tipo de transacción inválido en la fila 3: Cérdito.",
        );
    });

    it("Debe lanzar un error si el ID de un registro es inválido", () => {
        expect(() => ParserCSV(textFilePathInvalidID)).toThrowError(
            "Error 😖: ID inválido en la fila 2: z.",
        );
    });

    it("Debe lanzar un error si el monto de un registro es inválido", () => {
        expect(() => ParserCSV(textFilePathInvalidAmount)).toThrowError(
            "Error 😖: Monto inválido en la fila 1: a.",
        );
    });

    it("Debe lanzar un error si el monto de un registro es negativo", () => {
        const textFilePathInvalidAmountNegative =
            "src/__tests__/__mocks__/testInvalidAmountNegative.csv";
        const csvContentInValidAmountNegative = `id,tipo,monto\n1,Crédito,-100\n2,Débito,50\n3,Crédito,200`;
        fs.writeFileSync(
            textFilePathInvalidAmountNegative,
            csvContentInValidAmountNegative,
            "utf8",
        );
        expect(() => ParserCSV(textFilePathInvalidAmountNegative)).toThrowError(
            "Error 😖: Monto negativo en la fila 1: -100.",
        );
    });
});
