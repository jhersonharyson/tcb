import {EventEmitter, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardsService {
  isActiveEditUsers = false;
  isActiveNewUsers = false;

//  showEditUserEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {

  }

  setActiveEditUsers() {
    this.isActiveNewUsers = false;
    this.isActiveEditUsers = true;
  }

  setActiveNewUsers() {
    this.isActiveNewUsers = true;
    this.isActiveEditUsers = false;
  }

  getActiveEditUsers() {
    return this.isActiveEditUsers;
  }

  getActiveNewUsers() {
    return this.isActiveNewUsers;
  }
}
