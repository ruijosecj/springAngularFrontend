import { ClientesService } from 'src/app/clientes.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit{
  clientes: Cliente[] = [];
  clienteSelecionado!: Cliente;
  menssagemSucesso!: string;
  menssagemErro!: string;

  constructor(private service: ClientesService, private router: Router){}

  ngOnInit(): void {
      this.service
      .getClientes()
      .subscribe(response => this.clientes = response);
  }

  novoCadastro(){
    this.router.navigate(['/clientes/form'])
  }

  preparaDelecao(cliente:Cliente){
    this.clienteSelecionado = cliente;
  }

  deletarCliente(){
    this.service.deletar(this.clienteSelecionado)
      .subscribe(
        response => { this.menssagemSucesso = `Cliente deletado com sucesso!`
                      this.ngOnInit();
                    },
        erro => this.menssagemErro = 'Ocorreu um erro ao deletar o cliente!'
      )
  }

}
