import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css'],
  standalone: false
})
export class CadastrarClienteComponent {
  nome = '';
  endereco = '';

  constructor(private service: ClienteService, private router: Router) {}

  cadastrar(): void {
    const cliente = { nome: this.nome, endereco: this.endereco };
    //this.service.cadastrarCliente(cliente).subscribe(() => {
     // this.router.navigate(['/clientes']);
    //});
  }
}
