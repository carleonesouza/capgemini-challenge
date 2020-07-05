import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    public uid: string = null;

    constructor(private router: Router) { }

    get authenticated(): boolean {
        return localStorage.getItem('mSessionId') !== null;
    }

}
