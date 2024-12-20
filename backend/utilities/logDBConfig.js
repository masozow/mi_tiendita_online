import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

// Configuración de la base de datos
const initDb = async () => {
  const dbPath = path.resolve("backend", "logs", "logs.db");
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // Crear la tabla de logs si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      level TEXT NOT NULL,
      message TEXT NOT NULL,
      generic_id TEXT,
      user_id INTEGER NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
};

export default initDb;
