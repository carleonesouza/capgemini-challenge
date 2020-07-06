import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { MatMenu, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AuthGuard } from '../../guards/authGuard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('authMenu')
  authMenu: MatMenu;

  @ViewChild('start')
  start: MatSidenav;
  mobileMode = false;
  showMenu = false;


  navItems = [
          { name: 'Home', route: '/' },
          { name: 'Contas', route: '/contas'},
          { name: 'deposita', route: '/deposita' },
          { name: 'saca', route: '/saca' },
      ];

  constructor(private router: Router, private auth: AuthService) {
    const deviceMobile = window.navigator.userAgent.toLowerCase().includes('mobi');
    if (deviceMobile) {
      this.mobileMode = true;
    } else {
      this.mobileMode = false;
    }
  }


  ngOnInit() {
    this.auth.open.subscribe((open) => {
      this.showMenu = open;
    });
  }

  @HostListener('window:resize', ['$event'])
    mobileModeAction() {
      if (window.screen.width >= 351 && window.screen.width <= 768) {
        this.mobileMode = true;
      } else {
        this.mobileMode = false;
      }
    }

    signOut(): void {
      if (window && window.localStorage) {
          window.localStorage.clear();
          localStorage.removeItem('mSesssionId');
      }
      this.router.navigate(['/login']);
  }

}
