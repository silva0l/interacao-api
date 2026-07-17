import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css'],
  standalone: false
})
export class ListarClienteComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private service: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    // this.service.getClientes().subscribe((data) => (this.clientes = data));
  }

  editar(id: number): void {
    this.router.navigate(['/clientes/atualizar', id]);
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir este cliente?')) {
      return;
    }
    this.service.excluirCliente(id).subscribe(() => this.loadClientes());
  }
}
