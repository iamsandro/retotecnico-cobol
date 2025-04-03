# README

## Introducción

Este proyecto es un reto técnico desarrollado en TypeScript. Su propósito es demostrar habilidades en el lenguaje TypeScript mediante la implementación de una solución funcional y eficiente para el reto técnico planteado.

## Instrucciones de Ejecución

### 1. Instalación de Dependencias

Asegúrate de tener un editor como Visual Studio Code o similares instalado en tu sistema.

### 2. Ejecución de la Aplicación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/iamsandro/retotecnico-cobol.git
   cd retotecnico-cobol
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el programa:
   ```bash
   npm start
   ```

## Enfoque y Solución

La solución implementada sigue un enfoque modular, distribuyendo las responsabilidades en diferentes secciones del código. Se priorizó la creación de código limpio, acompañado de comentarios explicativos en las partes más relevantes.

## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

- `src/`: Contiene la lógica principal del programa.
- `dist/`: Carpeta para los archivos generados necesarios para la ejecución.
- `docs/`: Documentación adicional sobre el proyecto.
- `tests/`: Scripts de prueba para validar la funcionalidad del programa.

### Árbol de Archivos

```plaintext
└── 📁src
    ├── 📁__tests__
    │   ├── 📁__mocks__
    │   │   ├── empty.csv
    │   │   ├── emptyFile.csv
    │   │   ├── testData.csv
    │   │   ├── testInvalidAmount.csv
    │   │   ├── testInvalidAmountNegative.csv
    │   │   ├── testInvalidID.csv
    │   │   └── testInvalidType.csv
    │   ├── cli.test.ts
    │   ├── parcerCSV.test.ts
    │   ├── reportGenerator.test.ts
    │   └── transactionDataAnalyzer.test.ts
    ├── 📁constants
    │   └── messages.ts
    ├── cli.ts
    ├── index.ts
    ├── parcerCSV.ts
    ├── reportGenerator.ts
    ├── transactionDataAnalyzer.ts
    └── types.ts
```

### 4. Diagrama de flujo

```mermaid
flowchart TD
  A[Inicio] --> B[Ingrese la ruta CSV a procesar]
  B -->|Ruta válida| C[Validar archivo CSV]
  B -->|Ruta inválida| G[Mostrar mensaje de error: 'Por favor, ingresa la ruta del archivo.']
  G --> B
  C -->|Archivo válido| D[Procesar datos del archivo]
  C -->|Archivo vacío| H[Mostrar mensaje de error: 'Archivo CSV vacío.']
  H --> F
  C -->|Archivo no es CSV| I[Mostrar mensaje de error: 'El archivo no es un CSV.']
  I --> B
  C -->|Archivo con errores| L[Mostrar mensaje de error: 'El archivo tiene errores.']
  L --> M[Mostrar opción: 'Omitir errores']
  L --> N[Mostrar opción: 'Corregir errores']
  N --> N1[Mostrar opción: 'Corregir todos los errores']
  N1 --> N1A[Mostrar mensaje por cada error: 'Corrige el campo -tipo o monto- inválido']
  N --> N2[Mostrar opción: 'Escoger los errores a corregir']
  N2A --> N1A
  N1A --> E
  N2 --> N2A[Mostrar lista de error para seleccionar]
  L --> Ñ[Mostrar opción: 'Salir']
  Ñ --> K
  M -->|Considera solo los datos válidos| E[Generar reporte de transacciones]
  D -->|Datos válidos| E[Generar reporte de transacciones]
  D -->|Datos inválidos| J[Mostrar mensaje de error: 'Error en los datos del archivo.']
  E --> F[¿Desea continuar?]
  F -->|Sí| B
  F -->|No| K[Fin]
```

### 4. Uso

Al ejecutar el programa, se mostrarán una serie de prompts en la terminal que guiarán al usuario en el uso de la aplicación. A continuación, se describen los prompts y cómo responder a ellos:

1. **Ingrese la ruta CSV a procesar:**

   - El programa pedirá que ingreses la ruta del archivo CSV que deseas analizar. Ejemplo:
     ```plaintext
     Por favor, sube la ruta del archivo (Ejemplo: ./data/transactions.csv):
     ```
   - Respuesta esperada: El nombre del archivo, como `./transactions_abril_2023.csv`.

2. **Se le mostrará el reporte de transaciones:**

   - Se te pedirá que elijas el tipo de reporte que deseas generar. Ejemplo:
     ```plaintext
           Reporte de Transacciones:
           -------------------------
           Balance Final: 325
           Transacción de Mayor Monto: ID 3 - 200)
           Conteo de Transacciones por Tipo: Crédito: 3 Débito: 2
     ```
   - Respuesta esperada: El número correspondiente a la opción deseada, como `1` o `2`.

3. **Confirmación de salida:**

   - Una vez generado el reporte, el programa le preguntará si desea continuar. Ejemplo:
     ```plaintext
           ¿Quieres continuar? (Y/n):
     ```
   - Respuesta esperada: `y` para procesar otro archivo o `n` para finalizar, si ingresa cualquier caracter diferente de `n` el programa considerará que desea continuar.

4. **Si no ingresa una ruta al archivo csv**
   - Si no ingresa ninguna ruta se le mostrará un mensaje de error:
     ```plaintext
           > Por favor, sube la ruta del archivo.
     ```
5. **Si ingresa una ruta con una extensión diferente a .csv**
   - Si ingresa una ruta de un archivo que no es csv se le mostrará un mensaje de error:
     ```plaintext
           > El archivo no es un CSV.
     ```
6. **Si ingresa una ruta de un archivo CSV vacío**
   - Si ingresa una ruta de un archivo que no es csv se le mostrará un mensaje de error:
     ```plaintext
           > Error 😖: Archivo CSV vacío. Por favor, verifica el archivo.
     ```
7. **Si ingresa un archivo con un registro erroneo**
   - Si se encuentra un error en uno de los registros el programa se detiene y se le mostrará un mensaje de error:
     ```plaintext
           > Error 😖: Tipo de transacción inválido en la fila 5: Cérdito.
     ```

Estas interacciones aseguran que el usuario pueda navegar fácilmente por las funcionalidades del programa.
