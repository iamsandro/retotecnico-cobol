// Exporta las clases principales para que otros proyectos las usen
export { ParserCSV } from "./parcerCSV";
export { TransactionDataAnalyzer } from "./transactionDataAnalyzer";
export { ReportGenerator } from "./reportGenerator";
export type { Transaction } from "./types";
import { InteractiveCLI } from "./cli";

// Ejecuta la aplicación
(async () => {
    const cli = new InteractiveCLI();
    await cli.run();
})();
