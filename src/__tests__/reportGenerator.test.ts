import { ReportGenerator } from "../reportGenerator";
import { TransactionDataAnalyzer } from "../transactionDataAnalyzer";
import { Transaction } from "../types";

describe("ReportGenerator", () => {
    const transactions: Transaction[] = [
        { id: "1", tipo: "Crédito", monto: 100 },
        { id: "2", tipo: "Débito", monto: 50 },
        { id: "3", tipo: "Crédito", monto: 200 },
    ];

    it("Debe generar un reporte correcto", () => {
        const transactionDataAnalyzer = new TransactionDataAnalyzer(
            transactions,
        );
        const report = ReportGenerator.generateReport(transactionDataAnalyzer);
        expect(report).toContain("Reporte de Transacciones:");
        expect(report).toContain("Balance Final: 250");
        expect(report).toContain("Transacción de Mayor Monto: ID 3 - 200)");
        expect(report).toContain(
            "Conteo de Transacciones por Tipo: Crédito: 2 Débito: 1",
        );
    });
});
