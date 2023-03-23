import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicoPrestado } from './servico-prestado/servico-prestado'
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  constructor(private http:HttpClient) { }

  salvar(servicoPrestado:ServicoPrestado): Observable<ServicoPrestado>{
    return this.http.post<ServicoPrestado>('http://localhost:8080/api/servicos-prestados', servicoPrestado);
  }

  buscar(nome: string, mes: number): Observable<ServicoPrestadoBusca[]>{
      const httpParams = new HttpParams().set('nome', nome).set('mes', mes ?  mes.toString() : '');
      return this.http.get<any>('http://localhost:8080/api/servicos-prestados?'+httpParams.toString());
  }
}
