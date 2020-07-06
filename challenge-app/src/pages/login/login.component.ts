import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ContaModel } from '../../model/conta-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContaService } from '../../service/conta.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AppComponent } from '../../app/app.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  conta: ContaModel;
  @Input() jaTemContaForm: FormGroup;

  constructor(public contaService: ContaService, private formBuilder: FormBuilder,
     private router: Router, private componentFactoryResolver: ComponentFactoryResolver,
     private viewContainerRef: ViewContainerRef, private snackBar: MatSnackBar,
     private auth: AuthService) {  }

  ngOnInit() {
    this.jaTemContaForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.minLength(3)]],
    });
  }



  get userId() {
    return this.jaTemContaForm.get('userId');
  }

  onNoClick() {
    this.jaTemContaForm.reset();
  }

  onSubmit() {
    if (this.jaTemContaForm.valid.valueOf()) {
      const userId = this.jaTemContaForm.value.userId;
      this.contaService.getContaById(userId).subscribe(user => {
        if (user) {
          localStorage.setItem('mSessionId', userId);
          this.auth.uid = userId;
          this.router.navigate(['/conta']);
          this.gotToApp();
        }
      }, (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred this process', 'RETRY', { duration: 4000 });
      });
    }
  }

  gotToApp() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AppComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }
}
