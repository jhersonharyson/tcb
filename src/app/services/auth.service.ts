import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Account} from '../domain/account';
import {currentUser} from '../models/currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: currentUser;
  code: string;
  token: string;
  // tslint:disable-next-line:variable-name
  refresh_token: string;
  authenticated = false;
  grant_type: string = environment.grant_type;
  redirect_uri: string = environment.redirect_uri;

  constructor(private http: HttpClient) {
  }

  isAuthenticated() {
    return this.authenticated;
  }

  setAuthenticated(authenticated: boolean) {
    return (this.authenticated = authenticated);
  }

  async setCreadentials(data: any) {
    this.token = data.access_token;
    this.refresh_token = data.refresh_token;
    // get user

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };

    try {
      const user_response: any = await this.http
        .get(`${environment.url_security_api}/usuario`, httpOptions)
        .toPromise();
      let {data: user} = user_response;
      user = new currentUser(
        user.id,
        user.nome,
        user.nrCpf,
        user.nrCnpj,
        user.email,
        user.perfil == 'GERENTE'
      );

      const user_accounts_response: any = await this.http
        .get(`${environment.url_tcb_api}/empresa/conta`, httpOptions)
        .toPromise();

      let {data: accounts} = user_accounts_response;

      accounts = accounts.map(
        account =>
          new Account(
            account.id,
            account.codigoBanco,
            account.nrAgencia,
            account.nrConta
          )
      );

      user.setAccounts(accounts);

      this.currentUser = user;

      this.authenticated = true;
    } catch (e) {
      console.log(e);
    }
  }

  async getPermissions(code: string) {
    const form = new FormData();
    form.append('grant_type', `${this.grant_type}`);
    form.append('code', `${code}`);
    form.append('redirect_uri', `${this.redirect_uri}`);

    const httpOptions = {
      headers: new HttpHeaders({
        // "Content-Type": "multipart/form-data; boundary",
        Authorization: `Basic ${btoa(
          `${environment.authorization.username}:${environment.authorization.password}`
        )}`
      })
    };

    try {
      const response = await this.http
        .post(`${environment.url_security}/oauth/token`, form, httpOptions)
        .toPromise();
      this.setCreadentials(response);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async revokePermissions() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };

    try {
      const response = await this.http
        .delete(`${environment.url_security}/oauth/token/revoke`, httpOptions)
        .toPromise();
      this.currentUser = null;
      this.code = null;
      this.token = null;
      this.refresh_token = null;
      this.authenticated = false;
      return response;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      window.location.replace(
        `${environment.url_security}/logout?redirect_uri=${environment.redirect_uri}`
      );
    }
  }
}
