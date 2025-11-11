// 1. Importa o pool (a conexão) que o api/db-pool.js criou.
const pool = require('./db-pool.js');

// --- FUNÇÕES DE 'pessoa' ---

const createPessoa = async (request, response) => {
  const { nome, sobrenome, email, telefone, resumo_perfil } = request.body; 
  
  try {
    // 2. USA O POOL CORRETO
    const result = await pool.query(
      'INSERT INTO pessoa (nome, sobrenome, email, telefone, resumo_perfil) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, sobrenome, email, telefone, resumo_perfil]
    );
    response.status(201).json(result.rows[0]);
  } catch (e) {
    console.error('Erro em createPessoa:', e.message); 
    response.status(500).json({ error: e.message });
  }
};

const getAllPessoas = async (request, response) => {
  try {
    const result = await pool.query('SELECT * FROM pessoa');
    response.status(200).json(result.rows);
  } catch (e) {
    console.error('Erro em getAllPessoas:', e.message);
    response.status(500).json({ error: e.message });
  }
};

const getPessoaCompleta = async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const query = `
      SELECT 
        p.*,
        (
          SELECT COALESCE(json_agg(exp.* ORDER BY exp.data_inicio DESC), '[]'::json)
          FROM experiencia_profissional exp
          WHERE exp.pessoa_id = p.id
        ) AS experiencias,
        (
          SELECT COALESCE(json_agg(form.* ORDER BY form.data_inicio DESC), '[]'::json)
          FROM formacao_academica form
          WHERE form.pessoa_id = p.id
        ) AS formacoes
      FROM 
        pessoa p
      WHERE 
        p.id = $1
      GROUP BY 
        p.id;
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return response.status(404).json({ error: 'Pessoa não encontrada' });
    }
    response.status(200).json(result.rows[0]);
  } catch (e) {
    console.error('Erro em getPessoaCompleta:', e.message);
    response.status(500).json({ error: e.message });
  }
};

const updatePessoa = async (request, response) => {
  const id = parseInt(request.params.id);
  const { nome, sobrenome, email, telefone, resumo_perfil } = request.body;
  try {
    const result = await pool.query(
      'UPDATE pessoa SET nome = $1, sobrenome = $2, email = $3, telefone = $4, resumo_perfil = $5 WHERE id = $6 RETURNING *',
      [nome, sobrenome, email, telefone, resumo_perfil, id]
    );
    if (result.rows.length === 0) {
      return response.status(404).json({ error: 'Pessoa não encontrada para atualização' });
    }
    response.status(200).json(result.rows[0]);
  } catch (e) {
    console.error('Erro em updatePessoa:', e.message);
    response.status(500).json({ error: e.message });
  }
};

const deletePessoa = async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const result = await pool.query('DELETE FROM pessoa WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return response.status(404).json({ error: 'Pessoa não encontrada para deletar' });
    }
    response.status(200).json({ success: true, message: `Pessoa ${id} deletada` });
  } catch (e) {
    console.error('Erro em deletePessoa:', e.message);
    response.status(500).json({ error: e.message });
  }
};

const addExperiencia = async (request, response) => {
  const pessoa_id = parseInt(request.params.id);
  const { cargo, empresa, data_inicio, data_fim, descricao } = request.body;
  try {
    const result = await pool.query(
      'INSERT INTO experiencia_profissional (pessoa_id, cargo, empresa, data_inicio, data_fim, descricao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [pessoa_id, cargo, empresa, data_inicio, data_fim, descricao]
    );
    response.status(201).json(result.rows[0]);
  } catch (e) {
    console.error('Erro em addExperiencia:', e.message);
    response.status(500).json({ error: e.message });
  }
};

const updateExperiencia = async (request, response) => {
  const pessoa_id = parseInt(request.params.id);
  const exp_id = parseInt(request.params.exp_id);
  const { cargo, empresa, data_inicio, data_fim, descricao } = request.body;
  try {
    const result = await pool.query(
      'UPDATE experiencia_profissional SET cargo = $1, empresa = $2, data_inicio = $3, data_fim = $4, descricao = $5 WHERE id = $6 AND pessoa_id = $7 RETURNING *',
      [cargo, empresa, data_inicio, data_fim, descricao, exp_id, pessoa_id]
    );
    if (result.rows.length === 0) {
      return response.status(404).json({ error: `Experiência ${exp_id} não encontrada para a pessoa ${pessoa_id}` });
    }
    response.status(200).json(result.rows[0]);
  } catch (e) {
    console.error('Erro em updateExperiencia:', e.message);
    response.status(500).json({ error: e.message });
  }
};

const deleteExperiencia = async (request, response) => {
  const pessoa_id = parseInt(request.params.id);
  const exp_id = parseInt(request.params.exp_id);
  try {
    const result = await pool.query('DELETE FROM experiencia_profissional WHERE id = $1 AND pessoa_id = $2', [exp_id, pessoa_id]);
    if (result.rowCount === 0) {
      return response.status(404).json({ error: `Experiência ${exp_id} não encontrada para a pessoa ${pessoa_id}` });
    }
    response.status(200).json({ success: true, message: `Experiência ${exp_id} deletada` });
  } catch (e) {
    console.error('Erro em deleteExperiencia:', e.message);
    response.status(500).json({ error: e.message });
  }
};

const addFormacao = async (request, response) => {
  const pessoa_id = parseInt(request.params.id);
  const { instituicao, curso, data_inicio, data_fim } = request.body;
  try {
    const result = await pool.query(
      'INSERT INTO formacao_academica (pessoa_id, instituicao, curso, data_inicio, data_fim) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [pessoa_id, instituicao, curso, data_inicio, data_fim]
    );
    response.status(201).json(result.rows[0]);
  } catch (e) {
    console.error('Erro em addFormacao:', e.message);
    response.status(500).json({ error: e.message });
  }
};

const updateFormacao = async (request, response) => {
  const pessoa_id = parseInt(request.params.id);
  const form_id = parseInt(request.params.form_id);
  const { instituicao, curso, data_inicio, data_fim } = request.body;
  try {
    const result = await pool.query(
      'UPDATE formacao_academica SET instituicao = $1, curso = $2, data_inicio = $3, data_fim = $4 WHERE id = $5 AND pessoa_id = $6 RETURNING *',
      [instituicao, curso, data_inicio, data_fim, form_id, pessoa_id]
    );
    if (result.rows.length === 0) {
      return response.status(404).json({ error: `Formação ${form_id} não encontrada para a pessoa ${pessoa_id}` });
    }
    response.status(200).json(result.rows[0]);
  } catch (e) {
    console.error('Erro em updateFormacao:', e.message);
    response.status(500).json({ error: e.message });
  }
};

const deleteFormacao = async (request, response) => {
  const pessoa_id = parseInt(request.params.id);
  const form_id = parseInt(request.params.form_id);
  try {
    const result = await pool.query('DELETE FROM formacao_academica WHERE id = $1 AND pessoa_id = $2', [form_id, pessoa_id]);
    if (result.rowCount === 0) {
      return response.status(404).json({ error: `Formação ${form_id} não encontrada para a pessoa ${pessoa_id}` });
    }
    response.status(200).json({ success: true, message: `Formação ${form_id} deletada` });
  } catch (e) {
    console.error('Erro em deleteFormacao:', e.message);
    response.status(500).json({ error: e.message });
  }
};

module.exports = {
  createPessoa,
  getAllPessoas,
  getPessoaCompleta,
  updatePessoa,
  deletePessoa,
  addExperiencia,
  updateExperiencia,
  deleteExperiencia,
  addFormacao,
  updateFormacao,
  deleteFormacao,
};