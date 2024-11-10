// Utility script for managing connection to database.

import mysql from 'mysql2/promise';

// Create a type for your database connection (optional, but recommended)
interface DBConnection {
  execute: <T>(query: string, values?: any[]) => Promise<[T, mysql.FieldPacket[]]>;
}

// Function to create a connection to the database
const db = async (): Promise<DBConnection> => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  return connection;
};

export default db;
