const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries'); // Importa as funções do queries.js
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Rota principal (para teste)
app.get('/', (request, response) => {
  response.json({ info: 'API Node.js, Express e Postgres rodando' });
});

// Rotas da API
app.get('/api/pessoa', db.getAllPessoas);
app.get('/api/pessoa/:id', db.getPessoaCompleta);
app.post('/api/pessoa', db.createPessoa);
app.put('/api/pessoa/:id', db.updatePessoa);
app.delete('/api/pessoa/:id', db.deletePessoa);

app.post('/api/pessoa/:id/experiencia', db.addExperiencia);
app.put('/api/pessoa/:id/experiencia/:exp_id', db.updateExperiencia);
app.delete('/api/pessoa/:id/experiencia/:exp_id', db.deleteExperiencia); 

app.post('/api/pessoa/:id/formacao', db.addFormacao);
app.put('/api/pessoa/:id/formacao/:form_id', db.updateFormacao);
app.delete('/api/pessoa/:id/formacao/:form_id', db.deleteFormacao);

// Roda o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;