import { ParserCSV } from "./parcerCSV";
import { ReportGenerator } from "./reportGenerator";
import { TransactionDataAnalyzer } from "./transactionDataAnalyzer";

const data = ParserCSV(process.argv[2]);

const transactions = new TransactionDataAnalyzer(data);
const analizer = new ReportGenerator(transactions);
console.log("Ruben: Reporte final", analizer.generateReport());
