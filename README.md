# Interação com APIs (Desenhado para o SENAI)

Pequeno projeto didático para acompanhar uma aula do SENAI sobre consumo de APIs usando Node.js (backend) e Angular (frontend). O objetivo é facilitar a reprodução local pelo aluno: instalação, execução e testes básicos.

---

## Instalação e execução (rápido)

### Pré-requisitos

- Node.js: versão LTS (recomenda-se Node 18.x ou 20.x).
- npm: acompanha o Node (recomendado v9+).
- Git: para clonar o repositório.
- (Opcional) Angular CLI global: `npm install -g @angular/cli@20.2.14` — não é obrigatório.

### Passo a passo (Windows / PowerShell)

1) Clonar o repositório:

```powershell
git clone <url-do-repositorio>
cd <nome-do-repositorio>
```

2) Backend (Node.js)

```powershell
cd src/backend
npm install
# (opcional) rodar testes
npm test
# iniciar o backend (porta 3000)
npm start
```

O backend fica disponível em `http://localhost:3000`.

3) Frontend (Angular)

Opção recomendada (usa scripts do projeto):

```powershell
cd src/frontend
npm install
npm start
```

Isso executa `ng serve` e a aplicação ficará disponível em `http://localhost:4200`.

Se preferir não instalar a CLI globalmente, use:

```powershell
cd src/frontend
npm install
npx ng serve --open
```

### Observações rápidas

- O backend permite conexões do frontend em `http://localhost:4200` (CORS já configurado).
- Ports usados: backend `3000`, frontend `4200`.
- Se tiver problemas de versão do Node, use `nvm`/`nvm-windows` para gerenciar versões.

---

## Resumo da Aula (roteiro)

Objetivo: demonstrar o fluxo completo de comunicação entre Angular e uma API REST simples, cobrindo conceitos e prática.

- 1) Contextualização (15 min): mostrar API rodando e operações básicas (GET, POST, PUT, DELETE).
- 2) Apresentação do frontend (10 min): mostrar rotas, componentes, tela de listagem e cadastro.
- 3) Injeção de Dependência (10 min): explicar `HttpClientModule` e o erro "No provider for HttpClient" quando removido.
- 4) Construindo o GET (25 min): `HttpClient`, `Observable`, `subscribe` — implementação do `getClientes()` no service.
- 5) Consumindo no componente (10 min): usar `.subscribe()` para popular a tela.
- 6) Tratamento de erro (15 min): `pipe()`, `catchError()`, exibir mensagens amigáveis (SnackBar).
- 7) Construindo o POST (25 min): enviar payload JSON com `http.post()` e navegar ao confirmar cadastro.
- 8) Fechamento (10 min): revisão dos conceitos (DI, Service, HttpClient, Observable, Subscribe, Pipe, CatchError, SnackBar).

O material deixa os alunos implementando GET e POST; o professor entrega PUT, DELETE e rotas de atualização como apoio.

---

## Estrutura do repositório

- `src/backend`: servidor Node.js (`server.js`, `app.js`, `db.json`) e testes (Jest/SuperTest).
- `src/frontend`: aplicação Angular (código-fonte em `src/frontend/src/app`).

Para documentação específica do frontend Angular, consulte `src/frontend/README.md`.

---

Se quiser, atualizo também um `CONTRIBUTING.md` ou adiciono um `LICENSE` antes do push para o GitHub.
**Visão Geral**

Este repositório contém um exemplo de backend em Node.js e um frontend em Angular que demonstram operações básicas de interação com uma API (GET, POST, PUT, DELETE).

Estrutura principal:

- `src/backend`: código do backend Node.js (server.js, app.js, db.json, testes em Jest/SuperTest).
- `src/frontend`: aplicação Angular (CLI v20.x na configuração do projeto).

Propósito:

Este projeto foi criado para que o aluno acompanhasse uma aula do SENAI sobre interações com APIs. O objetivo era mostrar a arquitetura completa: frontend Angular → service → HttpClient → API → banco (simulado em `db.json`), cobrindo Dependency Injection, Observables, tratamento de erros, e operações CRUD.

Roteiro da Aula — Interação com APIs (2h):

1. Contextualização com Bruno (15 min)
	- Demonstração: API rodando, banco de dados, GET, POST, PUT, DELETE
	- Pergunta: "Como o Angular consegue buscar e enviar esses dados?"

2. Apresentação do Projeto Angular (10 min)
	- Mostrar: rotas, componentes, menu, tela de listagem, tela de cadastro
	- Perguntar: "Tudo está pronto visualmente. O que falta?" — Fazer conversar com a API

3. Injeção de Dependência (10 min)
	- Remover `HttpClientModule` e executar para demonstrar erro "No provider for HttpClient".
	- Explicar o que é injeção de dependência e o papel do `HttpClientModule`.

4. Construindo o GET (25 min)
	- Conceitos: `HttpClient`, `Observable`, `subscribe`
	- Exemplo: `getClientes(): Observable<Cliente[]> { return this.http.get<Cliente[]>(this.baseUrl); }`

5. Consumindo o GET no Component (10 min)
	- `this.service.getClientes().subscribe(clientes => this.clientes = clientes);`

6. Tratamento de Erro (15 min)
	- Introduzir `pipe()`, `catchError()` e exibir mensagens amigáveis (ex.: SnackBar)

7. Construindo o POST (25 min)
	- `http.post()` com payload JSON
	- Exemplo de uso no service e `subscribe()` no componente de cadastro

8. Fechamento (10 min)
	- Retomar conceitos: DI, Service, HttpClient, Observable, Subscribe, Pipe, CatchError, SnackBar

O que os alunos implementam:
- GET, POST (alunos)

O que é entregue pronto:
- PUT, DELETE, rota de atualização, botões da tabela, navegação (professor)

Requisitos e recomendações

- Node.js: versão LTS (recomenda-se Node 18.x LTS ou Node 20.x LTS). O `npm` acompanha o Node.
- npm: v9+ (vem com Node 18+).
- Angular CLI: o projeto usa Angular 20.x; você pode instalar globalmente com `npm i -g @angular/cli@20` (opcional). Alternativamente use `npx ng` ou os scripts `npm start` do projeto.
- Git: para clonar o repositório.

Passo a passo — clonar e executar (Windows / PowerShell)

1) Clonar o repositório:

```powershell
git clone <url-do-repositorio>
cd <nome-do-repositorio>
```

2) Backend (Node.js)

```powershell
cd src/backend
npm install
# (opcional) rodar testes
npm test
# iniciar o backend (porta 3000)

```

O backend roda em `http://localhost:3000` e já tem CORS configurado para permitir o frontend em `http://localhost:4200`.

3) Frontend (Angular)

Opção A — usando o script do projeto (recomendado):

```powershell
cd src/frontend
npm install
npm start
```

Isso executa `ng serve` e a aplicação ficará disponível em `http://localhost:4200`.

Opção B — sem instalar CLI globalmente, usando `npx`:

```powershell
cd src/frontend
npm install
npx ng serve --open
```

Observações importantes

- Se preferir instalar o `@angular/cli` globalmente: `npm install -g @angular/cli@20.2.14` (versão compatível com as dependências do projeto). Não é obrigatório — os scripts do `package.json` já usam a CLI local.
- Se você usa Windows e tiver problemas com permissões ou PATH, considere usar o terminal do VS Code ou `nvm-windows` para gerenciar versões do Node.
- Ports: backend 3000, frontend 4200.

Arquivos úteis

- Backend: `src/backend/server.js`, `src/backend/app.js`, `src/backend/db.json`.
- Frontend: `src/frontend/src/app` (componentes, services, modelos).

Scripts úteis

- Backend: `npm start` (inicia o servidor), `npm test` (roda testes com Jest).
- Frontend: `npm start` (roda `ng serve`), `npm test` (Karma/Jasmine).
