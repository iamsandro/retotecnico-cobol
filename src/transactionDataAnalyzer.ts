import { Transaction, TransactionCounts } from "./types";

/**
 * Clase para analizar datos de transacciones
 *
 * Esta clase permite calcular el balance final de una grupo de transacciones,
 * encontrar la transacción más alta y contar el número de transacciones por tipo.
 *
 * Ejemplo de uso:
 *
 * const transactions: Transaction[] = [
 *     { tipo: "Crédito", monto: 100 },
 *     { tipo: "Débito", monto: 50 },
 *     { tipo: "Crédito", monto: 200 },
 * ];
 *
 * const analyzer = new TransactionDataAnalyzer(transactions);
 * console.log(analyzer.CalculateFinalBalance()); // 250
 * console.log(analyzer.findHighestTransaction()); // { tipo: "Crédito", monto: 200 }
 * console.log(analyzer.countTransactionsByType()); // { Crédito: 2, Débito: 1 }
 */
export class TransactionDataAnalyzer {
    /**
     *
     * @param transactionData - Array de transacciones a analizar
     */
    constructor(private readonly transactionData: Transaction[]) {
        this.transactionData = transactionData;
    }

    /**
     * Calcula el balance final de las transacciones.
     * @returns El balance final calculado.
     */
    public CalculateFinalBalance(): number {
        return this.transactionData.reduce((acc, transaction) => {
            transaction.tipo === "Crédito"
                ? (acc += +transaction.monto)
                : (acc -= +transaction.monto);
            return acc;
        }, 0);
    }

    /**
     * Encuentra la transacción más alta.
     * @returns La transacción con el monto más alto.
     */
    public findHighestTransaction(): Transaction | null {
        if (this.transactionData.length === 0) return null;

        return this.transactionData.reduce(
            (maxTx, currentTx) => {
                return +maxTx.monto > +currentTx.monto ? maxTx : currentTx;
            },
            { monto: 0 } as Transaction,
        );
    }

    /**
     * Cuenta el número de transacciones por tipo.
     * @returns Un objeto con el conteo de transacciones por tipo.
     */
    public countTransactionsByType(): TransactionCounts {
        let TransactionCounts: TransactionCounts = { Crédito: 0, Débito: 0 };

        this.transactionData.forEach((transaction) => {
            transaction.tipo === "Crédito"
                ? TransactionCounts.Crédito++
                : TransactionCounts.Débito++;
        });
        return TransactionCounts;
    }
}
