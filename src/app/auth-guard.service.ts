import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      console.log(tokenDecode);
      

      if (tokenDecode.Admin && !this._tokenExpired(tokenDecode.exp)) return true;
    } 

    this.router.navigate(['/login']);
    return false;
  }
  


 private  _tokenExpired(expiration:any):boolean{
  return Math.floor(new Date().getTime() / 1000) >=expiration;
 }
}
