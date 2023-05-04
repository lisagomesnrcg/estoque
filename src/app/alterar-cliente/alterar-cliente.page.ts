import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alterar-cliente',
  templateUrl: './alterar-cliente.page.html',
  styleUrls: ['./alterar-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AlterarClientePage implements OnInit {
  id = '';
  nome = '';
  email = '';
  senha = '';
  confirmarsenha = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService 
  ) {} 

  ngOnInit() {
    this.id = this.ActivatedRoute.Snapshot.params{'id'};

    this.clienteService.getOne(this.id).subscribe(retorno => {
      this. nome=retorno.nome!;
      this. email=retorno.email!;
  })  
 }
   salvar(){
     if(this.senha === this.confrimarSenha){
       const cliente: Cliente ={
         id: this.id,
         nome: this.nome
         email: this.email
         senha: this.senha
       }
       this.clienteService.update(cliente).subscribe(dados => {
         
       })
     }
 }

}
