const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const DB_PATH = path.join(__dirname, 'db.json');

app.use(express.json());
app.use(cors({ origin: ['http://localhost:4200'] }));

async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { clientes: [] };
    }
    throw err;
  }
}

async function writeDB(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

// GET /clientes and GET /clientes?id=X (always returns an array)
app.get('/clientes', async (req, res) => {
  try {
    const db = await readDB();
    const { id } = req.query;
    if (id !== undefined) {
      const idNum = Number(id);
      const found = db.clientes.filter(c => c.id === idNum);
      return res.json(found);
    }
    return res.json(db.clientes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao ler base de dados' });
  }
});

// POST /clientes
app.post('/clientes', async (req, res) => {
  try {
    const { nome, endereco } = req.body;
    if (!nome || !endereco) {
      return res.status(400).json({ error: 'Campos "nome" e "endereco" são obrigatórios' });
    }
    const db = await readDB();
    const nextId = db.clientes.length > 0 ? Math.max(...db.clientes.map(c => c.id)) + 1 : 1;
    const novo = { id: nextId, nome, endereco };
    db.clientes.push(novo);
    await writeDB(db);
    res.status(201).json(novo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar cliente' });
  }
});

// PUT /clientes/:id
app.put('/clientes/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome, endereco } = req.body;
    if (!nome || !endereco) {
      return res.status(400).json({ error: 'Campos "nome" e "endereco" são obrigatórios' });
    }
    const db = await readDB();
    const idx = db.clientes.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Cliente não encontrado' });
    db.clientes[idx] = { id, nome, endereco };
    await writeDB(db);
    res.json(db.clientes[idx]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

// DELETE /clientes/:id
app.delete('/clientes/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const db = await readDB();
    const idx = db.clientes.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Cliente não encontrado' });
    db.clientes.splice(idx, 1);
    await writeDB(db);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
});

module.exports = app;
