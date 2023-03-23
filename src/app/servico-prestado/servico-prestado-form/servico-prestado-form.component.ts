import { ServicoPrestadoService } from './../../servico-prestado.service';
import { ServicoPrestado } from './../servico-prestado';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service';


@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit{
  clientes:Cliente[] = [];
  servico!:ServicoPrestado;
  success: boolean = false;
  errors!: String[];

  constructor(
    private clienteService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService
  ){
    this.servico= new ServicoPrestado();
  }

  ngOnInit(): void {
      this.clienteService
        .getClientes()
        .subscribe(response => this.clientes = response);
  }

  onSubmit(){
   this.servicoPrestadoService
    .salvar(this.servico)
    .subscribe(response=>{
      this.success = true;
      this.errors = [];
      this.servico = new ServicoPrestado();
    }, errorResponse => {
      this.success = false;
      this.errors = errorResponse.error.errors;
    });


  }
}
