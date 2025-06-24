// backend/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Resolve o caminho absoluto do arquivo PEM
const certPath = path.resolve(process.cwd(), process.env.DB_CA_CERT_PATH);

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 4000,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync(certPath, 'utf8')
  }
};

const pool = mysql.createPool(dbConfig);

// Testa a conexão ao iniciar a aplicação
pool.getConnection()
  .then(connection => {
    console.log('Conectado ao TiDB Cloud com sucesso!');
    connection.release();
  })
  .catch(err => {
    console.error('Erro ao conectar ao TiDB Cloud:', err.message);
  });

export default pool;
