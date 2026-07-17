import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClienteComponent } from './components/listar-cliente/listar-cliente.component';
import { CadastrarClienteComponent } from './components/cadastrar-cliente/cadastrar-cliente.component';
import { AtualizarClienteComponent } from './components/atualizar-cliente/atualizar-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ListarClienteComponent },
  { path: 'clientes/cadastrar', component: CadastrarClienteComponent },
  { path: 'clientes/atualizar/:id', component: AtualizarClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
