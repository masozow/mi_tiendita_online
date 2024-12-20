import queryLogs from "./queryLog.js";

const logs = await queryLogs(); // Todos los logs
console.log(logs);

// const errorLogs = await queryLogs("ERROR"); // Solo logs de nivel ERROR
// console.log(errorLogs);

//Falta hacer más consultas para filtrar por ID genérico y que el mensaje contenga
//por ejemplo "insertar producto", y por fecha, para saber quién ingresó el producto en
//esa momento específico.
