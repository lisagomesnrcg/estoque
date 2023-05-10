import { ClientesService } from './../services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../models/Cliente.model';

@Component({
  selector: 'app-alterar-cliente',
  templateUrl: './alterar-cliente.page.html',
  styleUrls: ['./alterar-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AlterarClientePage implements OnInit {

  id = 0;
  nome = '';
  email = '';
  senha = '';
  confirmaSenha = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clienteService: ClientesService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.clienteService.getOne(this.id).subscribe(retorno => {
      this.nome = retorno.nome as string;
      this.email = retorno.email ? retorno.email : '';
    })
  }

  salvar() {
    if (this.senha === this.confirmaSenha) {
      const cliente: Cliente = {
        id: this.id,
        nome: this.nome,
        email: this.email,
        senha: this.senha
      }
      this.clienteService.update(cliente).subscribe(dados => {
        alert('Cliente alterado com sucesso: ' + dados.id)
        // navegação vem aqui!
        this.router.navigateByUrl('/home');
        //this.route.navigate(['/home']);
      });

      //Nunca colocar a navegação fora... vai voltar sem saber a reposta
    } else {
      alert('Senhas não conferem.')
    }
  }

}
