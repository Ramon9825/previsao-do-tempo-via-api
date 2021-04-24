import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable()
export class DetailsGuard {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if(route.queryParams.lat && route.queryParams.lon) {
      return true;
    }
    return this.router.createUrlTree(['']);
  }
}
