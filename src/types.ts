/**
 * Transacción bancaria
 */
export interface Transaction {
    id: string;
    tipo: "Crédito" | "Débito";
    monto: number;
}

/**
 * Contador de transacciones por tipo
 * @property {number} Crédito - Número de transacciones de tipo "Crédito"
 */
export interface TransactionCounts {
    Crédito: number;
    Débito: number;
}
