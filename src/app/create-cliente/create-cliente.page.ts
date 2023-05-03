import { Component, OnInit } from '@angular/core';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clientes.service';
import { Cliente } from '../models/Cliente.model';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.page.html',
  styleUrls: ['./create-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateClientePage implements OnInit {

  nome = '';
  Email = '';
  senha = ''; 
  confirmarsenha = '';

  constructor(private route: Router, private clientesService: ClientesService) { }

  ngOnInit() {}

  salvar(){
    if (this.senha === this.confirmarsenha){
      const cliente:Cliente = {
        nome: this.nome,
        email: this.email,
        senha: this.senha
      }
      this.clientesService.create(cliente).subscribe(dados =. {
        alert('Cliente inserido com sucesso:' + dados.id)
        //navegação vem aqui!
        this.route.navigateByUrl('/home');
        //this.route.navigate(['/home']);
      });

       //Nunca colocar a navegação fora... vai voltar sem saber a resposta
      }else{
        alert('Senhas não conferem.')
      }  
    }
  }

     
   


