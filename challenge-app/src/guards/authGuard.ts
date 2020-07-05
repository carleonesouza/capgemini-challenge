import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private auth: AuthService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
            if (localStorage.getItem('mSessionId') === null) {
                    this.router.navigate(['/account/login']);
                    return false;
            }
            return true;
    }

}
