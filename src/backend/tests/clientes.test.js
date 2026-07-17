const request = require('supertest');
const fs = require('fs').promises;
const path = require('path');
const app = require('../app');

const DB = path.join(__dirname, '..', 'db.json');
const initialData = {
  clientes: [
    { id: 1, nome: 'Maria Silva', endereco: 'Rua das Flores, 123' },
    { id: 2, nome: 'João Pereira', endereco: 'Avenida Brasil, 456' }
  ]
};

beforeEach(async () => {
  await fs.writeFile(DB, JSON.stringify(initialData, null, 2));
});

afterAll(async () => {
  // restore initial state
  await fs.writeFile(DB, JSON.stringify(initialData, null, 2));
});

describe('CRUD /clientes', () => {
  test('GET /clientes retorna array com 2 itens', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test('GET /clientes?id=1 retorna array com 1 item', async () => {
    const res = await request(app).get('/clientes').query({ id: 1 });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].id).toBe(1);
  });

  test('POST /clientes cria um novo cliente', async () => {
    const payload = { nome: 'Novo Cliente', endereco: 'Rua X, 1' };
    const res = await request(app).post('/clientes').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe(payload.nome);

    const all = await request(app).get('/clientes');
    expect(all.body.length).toBe(3);
  });

  test('PUT /clientes/:id atualiza cliente', async () => {
    // cria primeiro
    const post = await request(app).post('/clientes').send({ nome: 'Para Atualizar', endereco: 'Rua Y' });
    const id = post.body.id;

    const updated = { nome: 'Atualizado', endereco: 'Rua Atualizada' };
    const put = await request(app).put(`/clientes/${id}`).send(updated);
    expect(put.statusCode).toBe(200);
    expect(put.body.nome).toBe('Atualizado');

    const get = await request(app).get('/clientes').query({ id });
    expect(get.body[0].nome).toBe('Atualizado');
  });

  test('DELETE /clientes/:id remove cliente', async () => {
    // cria primeiro
    const post = await request(app).post('/clientes').send({ nome: 'Para Deletar', endereco: 'Rua Z' });
    const id = post.body.id;

    const del = await request(app).delete(`/clientes/${id}`);
    expect(del.statusCode).toBe(204);

    const all = await request(app).get('/clientes');
    expect(all.body.find(c => c.id === id)).toBeUndefined();
  });
});
