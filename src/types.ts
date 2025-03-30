/**
 * Transacción bancaria
 */
export interface Transaction {
    id: string;
    tipo: "Crédito" | "Débito";
    monto: number;
}

/**
 * Resultado de una transacción
 */
export interface TransactionCounts {
    Crédito: number;
    Débito: number;
}
