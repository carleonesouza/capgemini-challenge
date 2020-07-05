import { Component, ViewChild, HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatMenu, MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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

  constructor(private router: Router) {
    const deviceMobile = window.navigator.userAgent.toLowerCase().includes('mobi');
    if (deviceMobile) {
      this.mobileMode = true;
    } else {
      this.mobileMode = false;
    }
  }
  ngOnInit(): void {
    if (localStorage.getItem('mSesseionId')) {
      this.showMenu = true;
    }
  }

  @HostListener('window:resize', ['$event'])
    mobileModeAction() {
      if (window.screen.width >= 351 && window.screen.width <= 768) {
        console.log(window.screen.width);
        this.mobileMode = true;
      } else {
        this.mobileMode = false;
      }
    }

    signOut(): void {
      if (window && window.localStorage) {
          window.localStorage.clear();
      }
      this.router.navigate(['/login']);
  }
  }
