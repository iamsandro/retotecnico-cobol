import { CLI } from "../cli";
import inquirer from "inquirer";
import { ParserCSV } from "../parcerCSV";
import { ReportGenerator } from "../reportGenerator";
import { TransactionDataAnalyzer } from "../transactionDataAnalyzer";
import { CLI_MESSAGES } from "../constants/cli_messages";

jest.mock("inquirer");
jest.mock("../parcerCSV");
jest.mock("../reportGenerator");
jest.mock("../transactionDataAnalyzer");

describe("CLI", () => {
  let cli: CLI;

  beforeEach(() => {
    cli = new CLI();
    jest.clearAllMocks();
  });

  it("Debe mostrar mensajes de bienvenida y despedida", async () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    (inquirer.prompt as any).mockResolvedValueOnce({
      filePath: "test.csv",
    });
    (inquirer.prompt as any).mockResolvedValueOnce({ continue: false });

    await cli.run();

    expect(consoleLogSpy).toHaveBeenCalledWith(CLI_MESSAGES.WELCOME);
    expect(consoleLogSpy).toHaveBeenCalledWith(CLI_MESSAGES.LINE_DOUBLE);
    expect(consoleLogSpy).toHaveBeenCalledWith(CLI_MESSAGES.GOODBYE);
  });

  it("Debe procesar un archivo CSV válido", async () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    const mockData = [{ id: 1, amount: 100 }];
    const mockReport = "Contenido del Reporte";

    (inquirer.prompt as any).mockResolvedValueOnce({
      filePath: "test.csv",
    });
    (inquirer.prompt as any).mockResolvedValueOnce({ continue: false });
    (ParserCSV as any).mockReturnValue(mockData);
    (TransactionDataAnalyzer as any).mockImplementation(() => ({
      analyze: jest.fn(),
    }));
    (ReportGenerator.generateReport as any).mockReturnValue(mockReport);

    await cli.run();

    expect(ParserCSV).toHaveBeenCalledWith("test.csv");
    expect(ReportGenerator.generateReport).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(mockReport);
  });

  it("Debe manejar errores durante el procesamiento del CSV", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const errorMessage = "Error al procesar el archivo";

    (inquirer.prompt as any).mockResolvedValueOnce({
      filePath: "test.csv",
    });
    (inquirer.prompt as any).mockResolvedValueOnce({ continue: false });
    (ParserCSV as any).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await cli.run();

    expect(consoleErrorSpy).toHaveBeenCalledWith(errorMessage);
  });

  it("Debe preguntar al usuario si desea continuar", async () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    (inquirer.prompt as any).mockResolvedValueOnce({
      filePath: "test.csv",
    });
    (inquirer.prompt as any).mockResolvedValueOnce({ continue: true });
    (inquirer.prompt as any).mockResolvedValueOnce({
      filePath: "test2.csv",
    });
    (inquirer.prompt as any).mockResolvedValueOnce({ continue: false });

    await cli.run();

    expect(consoleLogSpy).toHaveBeenCalledWith(CLI_MESSAGES.WELCOME);
    expect(consoleLogSpy).toHaveBeenCalledWith(CLI_MESSAGES.GOODBYE);
    expect(inquirer.prompt).toHaveBeenCalledTimes(4);
  });
});
