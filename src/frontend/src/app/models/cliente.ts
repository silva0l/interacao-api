export class Cliente {
  id: number;
  nome: string;
  endereco: string;

  constructor(id: number = 0, nome: string = '', endereco: string = '') {
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
  }
}
