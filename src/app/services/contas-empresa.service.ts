import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { EmpresaContaDTO } from '../domain/conta';


@Injectable({
  providedIn: 'root'
})
export class ContasEmpresaService {

private url: string = `${environment.urlbase}/empresa/conta`;

constructor(private _http: HttpClient, private authService: AuthService) { }

public findAll(): Observable<EmpresaContaDTO[]> {
  var header = {
    headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
  };
  return this._http.get<EmpresaContaDTO[]>(this.url, header);
}

}
