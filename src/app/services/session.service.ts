import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  private readonly API = 'http://192.168.40.67:8080/tcb-api/api/v1/usuario/externo';

  constructor(private http: HttpClient) { }

  getSession() {
    return this.http.get(this.API);
  }

  getSessionUser() {
    // tslint:disable-next-line:label-position no-unused-expression

/*    for (let i = 0; i < 10; i++) {
      ({
        fullName: `User ${(i * (i * (2 % i)))}`,
        cpf: `1${(6789846 * i + (616 * (i + (i * i))))}78`,
        cnpj: ((i + 45666666666) * i * (i + (i * i))).toString(),
        password: `123321${i}`,
        email: `teste${i}@teste`,
        master: i === 1 ? true : false,
        state: true,
        date: '25/12/2001'
        /!*        state: (Math.random() * 6).toFixed(0),*!/
      });
    }
    lis*/
  }


}
