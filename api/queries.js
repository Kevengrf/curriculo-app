const pool = require('./db-pool');

const createPessoa = async (dadosPessoa) => {
  const { nome, sobrenome, email, telefone, resumo_perfil } = dadosPessoa;
  const result = await pool.query(
    'INSERT INTO pessoa (nome, sobrenome, email, telefone, resumo_perfil) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nome, sobrenome, email, telefone, resumo_perfil]
  );
  return result.rows[0];
};

const getAllPessoas = async () => {
  const result = await pool.query('SELECT * FROM pessoa ORDER BY id ASC');
  return result.rows;
};

const getPessoaCompleta = async (id) => {
    const query = `
      SELECT 
        p.*,
        (
          SELECT json_agg(exp)
          FROM (
            SELECT id, cargo, empresa, data_inicio, data_fim, descricao
            FROM experiencia_profissional
            WHERE pessoa_id = p.id
          ) AS exp
        ) AS experiencias,
        (
          SELECT json_agg(form)
          FROM (
            SELECT id, instituicao, curso, data_inicio, data_fim
            FROM formacao_academica
            WHERE pessoa_id = p.id
          ) AS form
        ) AS formacoes
      FROM pessoa p
      WHERE p.id = $1;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  };
  

const updatePessoa = async (id, dadosPessoa) => {
  const { nome, sobrenome, email, telefone, resumo_perfil } = dadosPessoa;
  const result = await pool.query(
    'UPDATE pessoa SET nome = $1, sobrenome = $2, email = $3, telefone = $4, resumo_perfil = $5 WHERE id = $6 RETURNING *',
    [nome, sobrenome, email, telefone, resumo_perfil, id]
  );
  return result.rows[0];
};

const deletePessoa = async (id) => {
  await pool.query('DELETE FROM pessoa WHERE id = $1', [id]);
};

const addExperiencia = async (pessoa_id, dadosExperiencia) => {
  const { cargo, empresa, data_inicio, data_fim, descricao } = dadosExperiencia;
  const result = await pool.query(
    'INSERT INTO experiencia_profissional (pessoa_id, cargo, empresa, data_inicio, data_fim, descricao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [pessoa_id, cargo, empresa, data_inicio, data_fim, descricao]
  );
  return result.rows[0];
};

const deleteExperiencia = async (exp_id) => {
  await pool.query('DELETE FROM experiencia_profissional WHERE id = $1', [exp_id]);
};

const addFormacao = async (pessoa_id, dadosFormacao) => {
  const { instituicao, curso, data_inicio, data_fim } = dadosFormacao;
  const result = await pool.query(
    'INSERT INTO formacao_academica (pessoa_id, instituicao, curso, data_inicio, data_fim) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [pessoa_id, instituicao, curso, data_inicio, data_fim]
  );
  return result.rows[0];
};

const deleteFormacao = async (form_id) => {
  await pool.query('DELETE FROM formacao_academica WHERE id = $1', [form_id]);
};

module.exports = {
  createPessoa,
  getAllPessoas,
  getPessoaCompleta,
  updatePessoa,
  deletePessoa,
  addExperiencia,
  deleteExperiencia,
  addFormacao,
  deleteFormacao,
};
