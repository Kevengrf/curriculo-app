require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const db = require('./queries');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas para Pessoa
app.post('/api/pessoa', async (req, res) => {
  try {
    const novaPessoa = await db.createPessoa(req.body);
    res.status(201).json(novaPessoa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/pessoa', async (req, res) => {
  try {
    const pessoas = await db.getAllPessoas();
    res.status(200).json(pessoas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/pessoa/:id', async (req, res) => {
  try {
    const pessoa = await db.getPessoaCompleta(req.params.id);
    if (pessoa) {
      res.status(200).json(pessoa);
    } else {
      res.status(404).send('Pessoa não encontrada');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/pessoa/:id', async (req, res) => {
  try {
    const pessoaAtualizada = await db.updatePessoa(req.params.id, req.body);
    res.status(200).json(pessoaAtualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/pessoa/:id', async (req, res) => {
  try {
    await db.deletePessoa(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rotas para Experiência
app.post('/api/pessoa/:id/experiencia', async (req, res) => {
  try {
    const novaExperiencia = await db.addExperiencia(req.params.id, req.body);
    res.status(201).json(novaExperiencia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/experiencia/:exp_id', async (req, res) => {
    try {
      await db.deleteExperiencia(req.params.exp_id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Rotas para Formação
app.post('/api/pessoa/:id/formacao', async (req, res) => {
  try {
    const novaFormacao = await db.addFormacao(req.params.id, req.body);
    res.status(201).json(novaFormacao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/formacao/:form_id', async (req, res) => {
    try {
      await db.deleteFormacao(req.params.form_id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

module.exports = app;
