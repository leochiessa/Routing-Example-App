import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  /*canLoad(route: import("@angular/router").Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(`/${route.path}`);
  }*/

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.userService.getToken) { return true; }
    this.userService.redirectUrl = url;
    this.router.navigate(["/login"]);
    return false;
  }

  /*canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isLoggedIn.pipe(
      take(1),
      map((loggedIn: boolean) => {
        if (!loggedIn) {
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      })
    );
  }

  checkLogin(url: string): boolean {
    if (this.userService.getToken) { return true; }
    this.userService.redirectUrl = url;
    this.router.navigateByUrl('/login');
    return false;
  }*/
}