import { TransactionDataAnalyzer } from "./transactionDataAnalyzer";

export class ReportGenerator {
    constructor(
        private readonly transactionDataAnalyzer: TransactionDataAnalyzer,
    ) {}

    public generateReport(): string {
        const finalBalance =
            this.transactionDataAnalyzer.CalculateFinalBalance();
        const highestTransaction =
            this.transactionDataAnalyzer.findHighestTransaction();
        const transactionCounts =
            this.transactionDataAnalyzer.countTransactionsByType();

        return `
            Reporte de Transacciones:
            -------------------------
            Balance Final: ${finalBalance}
            Transacción de Mayor Monto: ID ${highestTransaction?.id} - ${highestTransaction?.monto})
            Conteo de Transacciones por Tipo: Crédito: ${transactionCounts.Crédito} Débito: ${transactionCounts.Débito}
        `;
    }
}
