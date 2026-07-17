# GET all
curl -sS http://localhost:3000/clientes | jq

# POST create
curl -sS -X POST http://localhost:3000/clientes -H "Content-Type: application/json" -d '{"nome":"Teste Curl","endereco":"Rua Curl, 99"}' | jq

# PUT update (replace 3 with the id you want)
curl -sS -X PUT http://localhost:3000/clientes/3 -H "Content-Type: application/json" -d '{"nome":"Atualizado Curl","endereco":"Rua Atualizada, 1"}' | jq

# DELETE (replace 3 with id)
curl -sS -X DELETE http://localhost:3000/clientes/3 -i

# Note: uses jq for pretty output; on Windows you can omit | jq or use PowerShell's ConvertFrom-Json
