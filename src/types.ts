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

export interface DetailsPrompt {
  type:
    | "input"
    | "number"
    | "confirm"
    | "list"
    | "rawlist"
    | "expand"
    | "checkbox"
    | "password"
    | "editor";
  name: string;
  message: string | ((answers: Record<string, any>) => string);
  default?:
    | string
    | number
    | boolean
    | Array<any>
    | ((
        answers: Record<string, any>,
      ) => string | number | boolean | Array<any>);
  choices?:
    | Array<string | { name: string; value: any; short?: string }>
    | ((
        answers: Record<string, any>,
      ) => Array<string | { name: string; value: any; short?: string }>);
  validate?: (input: string) => boolean | string | Promise<boolean | string>;
  filter?: (input: unknown, answers: Record<string, any>) => unknown;
  transformer?: (
    input: unknown,
    answers: Record<string, any>,
    flags: any,
  ) => unknown;
  when?: (answers: Record<string, any>) => boolean;
  pageSize?: number;
  prefix?: string;
  suffix?: string;
  askAnswered?: boolean;
  loop?: boolean;
  waitUserInput?: boolean;
}
