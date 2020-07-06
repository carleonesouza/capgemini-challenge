import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectSubscriber } from 'rxjs/Subject';


@Injectable()
export class AuthService {
    uid: any;
    @Output() open: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router) { }

    get authenticated(): boolean {
        if (localStorage.getItem('mSessionId') !== null) {
            this.open.emit(true);
            return true;
        } else {
            this.open.emit(false);
            this.router.navigate(['/login']);
            return false;
        }
    }

}
