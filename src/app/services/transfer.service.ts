import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Transfer } from "../domain/transfer";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TransferService {
  transfer: Transfer;

  private url: string = `${environment.urlbase}/transferencia`;

  constructor(private _http: HttpClient, private authService: AuthService) {}

  public insert(transfer: Transfer): Observable<Transfer> {
    var header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.token}`)
    };
    return this._http.post<Transfer>(this.url, transfer, header);
  }

  public findAll(): Observable<Transfer[]> {
    var header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${this.authService.token}`)
    };
    return this._http.get<Transfer[]>(this.url+"/TODOS/0/100", header);
  }
}
