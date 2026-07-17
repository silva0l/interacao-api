import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-atualizar-cliente',
  templateUrl: './atualizar-cliente.component.html',
  styleUrls: ['./atualizar-cliente.component.css'],
  standalone: false
})
export class AtualizarClienteComponent implements OnInit {
  cliente: Cliente = new Cliente();

  constructor(
    private route: ActivatedRoute,
    private service: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getCliente(id).subscribe((data) => {
      if (data && data.length > 0) {
        this.cliente = data[0];
      }
    });
  }

  salvar(): void {
    if (!this.cliente.id) {
      return;
    }
    this.service.atualizarCliente(this.cliente.id, this.cliente).subscribe(() => {
      this.router.navigate(['/clientes']);
    });
  }
}
