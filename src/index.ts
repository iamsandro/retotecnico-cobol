// Exporta las clases principales para que otros proyectos las usen
export { ParserCSV } from "./parcerCSV";
export { TransactionDataAnalyzer } from "./transactionDataAnalyzer";
export { ReportGenerator } from "./reportGenerator";
export type { Transaction } from "./types";
import { CLI } from "./cli";

// Ejecuta la aplicación
(async () => {
  const cli = new CLI();
  await cli.run();
})();
