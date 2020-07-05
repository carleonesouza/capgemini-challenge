import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContaService } from '../../service/conta.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { AppComponent } from '../../app/app.component';

@Component({
  selector: 'app-add-conta',
  templateUrl: './add-conta.component.html',
  styleUrls: ['./add-conta.component.scss']
})
export class AddContaComponent implements OnInit {
  @Input() contaForm: FormGroup;

  constructor(private contaService: ContaService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, private router: Router, private auth: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,) { }

  ngOnInit() {
    this.contaForm = this.formBuilder.group({
      usernameConta: ['', [Validators.required, Validators.minLength(3)]],
      numeroConta: ['', [Validators.required, Validators.minLength(3)]],
      saldoConta: ['', [Validators.required, Validators.minLength(3)]],
      limiteConta: ['',],
      tipoConta: ['', [Validators.required, Validators.minLength(2)]],
    });
  }


  get numeroConta() {
    return this.contaForm.get('numeroConta');
  }
  get usernameConta() {
    return this.contaForm.get('usernameConta');
  }

  get saldoConta() {
    return this.contaForm.get('saldoConta');
  }

  get limiteConta() {
    return this.contaForm.get('limiteConta');
  }
  get tipoConta() {
    return this.contaForm.get('tipoConta');
  }
  onNoClick() {
    this.contaForm.reset();
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.contaForm.valid.valueOf()) {
      const username = this.contaForm.value.usernameConta;
      const numero = this.contaForm.value.numeroConta;
      const saldo = this.contaForm.value.saldoConta;
      const limite = this.contaForm.value.limiteConta;
      const tipo = this.contaForm.value.tipoConta;
      const saveConta = { username, numero, saldo, limite, tipo };
      this.contaService.addConta(saveConta).subscribe((conta) => {
        this.snackBar.open('Conta criada com sucesso! ', '', { duration: 4000 });
        localStorage.setItem('mSessionId', conta.id);
        this.auth.uid = conta.id;
        this.router.navigate(['/']);
        this.gotToApp();
      }, (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred this process', 'RETRY', { duration: 4000 });
        console.log(err);
      });
    }
  }

  gotToApp() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AppComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }
}
