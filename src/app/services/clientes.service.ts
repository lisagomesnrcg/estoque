import { Cliente } from './../models/Cliente.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient, private alertCtrl: AlertController) { }

  create(cliente: Cliente) {
    return this.http.post<Cliente>(this.url, cliente).pipe(
    map(retorno => retorno),
    catchError(erro => this.exiberErro(erro))
    );
  }

  getAll():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirError(erro))
    );
  }

  getOne(id: number) {
    // this.http.get(this.url + '/' + id);
    return this.http.get(`${this.url}/${id}`);
  }

  update(cliente: Cliente) {
    return this.http.put(`${this.url}/${cliente.id}`, cliente);
  } 

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  login() { }

  logout() { }

  exibirError(erro: any): Observable<any>{
    const titulo = 'erro na conexão!'
    const msg = `Verifique na sua conexão ou Informe esse erro ao suporte: ${erro.status}`;
    this.presentAlert(titulo,msg);
    return EMPTY;
  }
  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
