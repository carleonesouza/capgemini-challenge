import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ContaModel } from '../model/conta-model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';


@Injectable()
export class ContaService {

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };


  // To get a list of Contas
  getContas(): Observable<ContaModel[]> {
    return this.httpClient.get<ContaModel[]>(
      `${environment.server}/contas`, this.httpOptions);
  }


  // Get a specific Conta
  getContaById(id: string): Observable<ContaModel> {
    return this.httpClient.get<ContaModel>(`${environment.server}/contas/${id}`, this.httpOptions)
      .pipe();
  }

  // Get a specific Conta
  mostraSaldo(id: string): Observable<number> {
    return this.httpClient.get<number>(`${environment.server}/contas/saldo/${id}`, this.httpOptions)
      .pipe();
  }

  // To add a new Conta
  addConta(contaModel: ContaModel): Observable<ContaModel> {
    const param = JSON.stringify(contaModel);
    return this.httpClient.post<ContaModel>(`${environment.server}/contas/add`, param, this.httpOptions).pipe();
  }

   // To make a deposit
   depositaConta(depoisto: any): Observable<ContaModel> {
    const param = JSON.stringify(depoisto);
    return this.httpClient.post<ContaModel>(`${environment.server}/contas/deposita/${depoisto.id_conta}`, param, this.httpOptions)
    .pipe();
  }

    // To make get a cash
    sacaConta(saca: any): Observable<boolean> {
        const param = JSON.stringify(saca);
      return this.httpClient.post<boolean>(`${environment.server}/contas/saca/${saca.id_conta}`, param, this.httpOptions)
      .pipe();
    }

  // To upadate a Conta by id
  updateConta(conta: ContaModel): Observable<ContaModel> {
      return this.httpClient.put<ContaModel>(`${environment.server}/contas/${conta.id}`, conta, this.httpOptions)
      .pipe();
  }

  // To delete a Conta by id
  deleteConta(contaModel: ContaModel): void {
    this.httpClient.request('delete', `${environment.server}/contas/${contaModel.id}`, this.httpOptions )
      .subscribe(() => {
        this.snackBar.open('The ContaModel was Successifuly deleted', '', { duration: 4000 });
      },
        (err: HttpErrorResponse) => {
          this.snackBar.open('Error occurred this process', 'RETRY', { duration: 4000 });
          console.log(err);
        }
      );
  }

 }
