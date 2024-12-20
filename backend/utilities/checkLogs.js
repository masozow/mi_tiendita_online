import queryLogs from "./queryLog.js";

const logs = await queryLogs(); // Todos los logs
console.log(logs);

// const errorLogs = await queryLogs("ERROR"); // Solo logs de nivel ERROR
// console.log(errorLogs);
