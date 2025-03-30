import { TransactionDataAnalyzer } from "../transactionDataAnalyzer";
import { Transaction } from "../types";

describe("TransactionDataAnalyzer", () => {
    const transactions: Transaction[] = [
        { id: "1", tipo: "Crédito", monto: 100 },
        { id: "2", tipo: "Débito", monto: 50 },
        { id: "3", tipo: "Crédito", monto: 200 },
    ];

    const analyzer = new TransactionDataAnalyzer(transactions);

    it("Debe calcula el balance final", () => {
        expect(analyzer.CalculateFinalBalance()).toBe(250);
    });

    it("Debe encontrar la transacción más alta", () => {
        expect(analyzer.findHighestTransaction()).toEqual({
            id: "3",
            tipo: "Crédito",
            monto: 200,
        });
    });

    it("Debe contabilizar las transaciones por tipo", () => {
        expect(analyzer.countTransactionsByType()).toEqual({
            Crédito: 2,
            Débito: 1,
        });
    });
});
