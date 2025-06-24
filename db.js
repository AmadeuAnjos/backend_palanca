// C:\Users\Aluno\Desktop\Amadeu\palanca\backend\db.js
import mysql from 'mysql2/promise'; // <-- Tem que ser 'import'
import dotenv from 'dotenv';       // <-- Tem que ser 'import'

dotenv.config(); // Carrega as variáveis de ambiente do .env

// Configurações do pool de conexões para o TiDB Cloud
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
        ca: process.env.DB_CA_CERT
    }
};

// Cria o pool de conexões
const pool = mysql.createPool(dbConfig);

// Testa a conexão uma vez ao iniciar a aplicação
pool.getConnection()
    .then(connection => {
        console.log('Conectado ao TiDB Cloud com sucesso!');
        connection.release();
    })
    .catch(err => {
        console.error('Erro ao conectar ao TiDB Cloud:', err.message);
    });

export default pool; // <-- Tem que ser 'export default'