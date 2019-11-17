import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Banco } from '../domain/banco';
@Injectable({
  providedIn: 'root'
})
export class BancoService {
  private url: string = `${environment.urlbase}/banco`;

  constructor(private _http: HttpClient, private authService: AuthService) {}

  public findAll(): Observable<Banco[]> {
    var header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    };
    return this._http.get<Banco[]>(this.url, header);
  }

}
