import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { currentUser } from '../models/currentUser';
import { state } from '@angular/animations';
import { GuardsService } from "./guards.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: User;
  /*userFinal: currentUser;*/
  auxUser: any;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private guardsService: GuardsService) {
  }

  setEditUser(user: User) {
    this.user = user;
  }

  getEditUser() {
    return this.user;
  }

  getNewUser() {
    // tslint:disable-next-line:label-position no-unused-expression
    let newUser: User;
    newUser = new User('', '', '', '', '', '', false, true, ``);
    return this.user = newUser;
  }

  cleanUser() {
    // tslint:disable-next-line:label-position no-unused-expression
    let emptyUser: User;
    emptyUser = new User('', '', '', '', '', '', false, true, ``);
    return this.user = emptyUser;
  }

  setDenyUser(user: User[]) {
  }

  convertUserPut() {
    let perf;
    if (this.user.master) {
      perf = 1;
    } else {
      perf = 2;
    }
    /*this.userFinal = new currentUser()*/
    return {
      id: this.user.id,
      codigoPerfil: perf,
      email: this.user.email,
      nome: this.user.fullName,
      password: this.user.password
      /*state: true,*/
    };
  }

  async putUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.token}`
      })
    };

    try {
      const response = await this.http
        .put(`${environment.url_security_api}/usuario/externo`, this.convertUserPut(), httpOptions)
        .toPromise();

      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /*  convertUserPost() {
      let perf;
      if (this.user.master) {
        perf = '1';
      } else {
        perf = '2';
      }
      /!*this.userFinal = new currentUser()*!/
      const userFinal = {
        codigoPerfil: perf,
        email: this.user.email,
        nome: this.user.fullName,
        password: this.user.password
        /!*state: true,*!/
      };
      return userFinal;
    }*/
  async postUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.token}`
      })
    };

    try {
      const response = await this.http
        .post(`${environment.url_security_api}/usuario/externo`, /*this.convertUserPost(),*/ httpOptions)
        .toPromise();


      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getCurrentUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.token}`
      })
    };

    try {
      const response = await this.http
        .get<any>(`${environment.url_security_api}/usuario/`, httpOptions)
        .toPromise();

      this.auxUser = response.data;
      this.user = {
        id: this.auxUser.id,
        cnpj: this.auxUser.nrCnpj,
        cpf: this.auxUser.nrCpf,
        email: this.auxUser.email,
        fullName: this.auxUser.nome,
        master: this.auxUser.perfil,
        password: '',
        state: true,
      };
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  setSaveUser(userFinal: User) {
    this.auxUser = null;
    this.user = userFinal;
  }

  /*getSaveUser() {
    return this.user;
  }*/

}
