import { CLI_MESSAGES } from "./constants/cli_messages";
import { TransactionDataAnalyzer } from "./transactionDataAnalyzer";
import { Transaction, TransactionCounts } from "./types";

export class ReportGenerator {
    public static generateReport(
        transactionDataAnalyzer: TransactionDataAnalyzer,
    ): string {
        const finalBalance: number = transactionDataAnalyzer.CalculateFinalBalance();
        const highestTransaction: Transaction = transactionDataAnalyzer.findHighestTransaction();
        const transactionCounts: TransactionCounts = transactionDataAnalyzer.countTransactionsByType();

        return CLI_MESSAGES.REPORT( finalBalance,  highestTransaction, transactionCounts);
    }
}
