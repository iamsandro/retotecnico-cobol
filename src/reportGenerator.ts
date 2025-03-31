import { TransactionDataAnalyzer } from "./transactionDataAnalyzer";

export class ReportGenerator {
    public static generateReport(
        transactionDataAnalyzer: TransactionDataAnalyzer,
    ): string {
        const finalBalance = transactionDataAnalyzer.CalculateFinalBalance();
        const highestTransaction =
            transactionDataAnalyzer.findHighestTransaction();
        const transactionCounts =
            transactionDataAnalyzer.countTransactionsByType();

        return `
            Reporte de Transacciones:
            -------------------------
            Balance Final: ${finalBalance}
            Transacción de Mayor Monto: ID ${highestTransaction?.id} - ${highestTransaction?.monto})
            Conteo de Transacciones por Tipo: Crédito: ${transactionCounts.Crédito} Débito: ${transactionCounts.Débito}
        `;
    }
}
