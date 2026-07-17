import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cliente } from '../models/cliente';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private baseUrl = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  showMessage(msg: string, isError: boolean = false) {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      panelClass: isError ? ['snack-error'] : ['snack-success'],
    });
  }

  private handleError(err: HttpErrorResponse) {
    if (err.status === 0) {
      this.showMessage('Falha de conexão com o servidor', true);
    } else if (err.status === 404) {
      this.showMessage('Recurso não encontrado (404)', true);
    } else if (err.status === 500) {
      this.showMessage('Erro interno do servidor (500)', true);
    } else {
      this.showMessage('Erro inesperado', true);
    }
    return throwError(() => err);
  }

  getClientes() {
    // Aluno - Implementar a chamada HTTP GET para obter a lista de clientes
  }

  cadastrarCliente() {
    // ALUNO - Implementar a chamada HTTP POST para cadastrar um novo cliente
  }

  atualizarCliente(id: number, cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${id}`, cliente).pipe(
      tap(() => this.showMessage('Cliente atualizado com sucesso')),
      catchError((err) => this.handleError(err))
    );
  }

  excluirCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.showMessage('Cliente excluído com sucesso')),
      catchError((err) => this.handleError(err))
    );
  }
}
