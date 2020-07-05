import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({ selector: 'app-base', template: '' })
export class BaseComponent implements OnInit {
    constructor(private auth: AuthService,
                private router: Router) { }

    ngOnInit() {
        if (this.auth.authenticated) {
            this.router.navigate(['/conta']);
        } else {
            this.router.navigate(['/login']);
        }
    }
}
