require('dotenv').config({ path: './.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS pessoa (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        sobrenome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        telefone VARCHAR(50),
        resumo_perfil TEXT
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS experiencia_profissional (
        id SERIAL PRIMARY KEY,
        pessoa_id INTEGER REFERENCES pessoa(id) ON DELETE CASCADE,
        cargo VARCHAR(255) NOT NULL,
        empresa VARCHAR(255) NOT NULL,
        data_inicio DATE NOT NULL,
        data_fim DATE,
        descricao TEXT
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS formacao_academica (
        id SERIAL PRIMARY KEY,
        pessoa_id INTEGER REFERENCES pessoa(id) ON DELETE CASCADE,
        instituicao VARCHAR(255) NOT NULL,
        curso VARCHAR(255) NOT NULL,
        data_inicio DATE NOT NULL,
        data_fim DATE
      );
    `);

    console.log('Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabelas:', err);
  } finally {
    client.release();
  }
};

createTables().then(() => pool.end());
