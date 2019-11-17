import { AuthService } from './auth.service';
import { Finalidade } from "../domain/finalidade";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FinalidadeService {
  private url: string = `${environment.urlbase}/transferencia/finalidade`;

  constructor(private _http: HttpClient, private authService: AuthService) {}

  public findAll(): Observable<Finalidade[]> {
    var header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    };
    return this._http.get<Finalidade[]>(this.url, header);
  }

}
