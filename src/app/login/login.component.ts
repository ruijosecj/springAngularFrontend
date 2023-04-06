import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  cadastrando!: boolean;
  mensagemSucesso!: string;
  errors!: String[];

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  onSubmit(){
    this.authService
          .tentarLogar(this.username, this.password)
          .subscribe(response =>{
            console.log(response)
            const access_token = JSON.stringify(response);
            localStorage.setItem('access_token', access_token);
            this.router.navigate(['/home'])
          }, errorResponse =>{
            this.errors = ['Usuário e/ou senha incorreto(s).']
          })
  }

  preparaCadastrar(event:any){
    event.preventDefault();
    this.cadastrando=true;
  }
  cancelaCadastro(){

    this.cadastrando=false;
  }

  cadastrar(){
    const usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService
      .salvar(usuario)
      .subscribe(response =>{
        console.log(response)
      this.mensagemSucesso = 'Cadastro realizado com sucesso! Efetue o login.'
      this.cadastrando = false;
      this.username = '';
      this.password = '';
      this.errors = [];
    }, errorResponse =>{
      this.mensagemSucesso = '';
      this.errors = errorResponse.error.errors;
    })
  }
}
