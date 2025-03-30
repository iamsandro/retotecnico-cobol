import { ParserCSV } from "./parcerCSV";
import { TransactionDataAnalyzer } from "./transactionDataAnalyzer";

const data = ParserCSV(process.argv[2]);
console.log("Ruben: data", data);
const analizer = new TransactionDataAnalyzer(data);

console.log("Ruben: analizer", analizer.CalculateFinalBalance());
console.log("Ruben: analizer", analizer.findHighestTransaction());
console.log("Ruben: analizer", analizer.countTransactionsByType());
