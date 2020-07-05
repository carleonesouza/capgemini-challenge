import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContaService } from '../../service/conta.service';
import { MatSnackBar } from '@angular/material';
import { ContaModel } from '../../model/conta-model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-edit-conta',
  templateUrl: './edit-conta.component.html',
  styleUrls: ['./edit-conta.component.scss'],
  providers: [
    CurrencyPipe,
  ],
})
export class EditContaComponent implements OnInit {
  @Input() contaForm: FormGroup;
  conta = new ContaModel();
  NUMBERPATTERN = '^[0-9.,]+$';

  constructor(private contaService: ContaService, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar, private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
    this.contaForm = this.formBuilder.group({
      usernameConta: ['', [Validators.required, Validators.minLength(3)]],
      numeroConta: ['', [Validators.required, Validators.minLength(3)]],
      saldoConta: [{value: '', disabled: true}, [Validators.pattern(this.NUMBERPATTERN)]],
      limiteConta: ['', [Validators.required, Validators.minLength(2)]],
      tipoConta: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.contaService.getContaById(localStorage.getItem('mSessionId')).subscribe((userConta) => {
      this.conta = userConta;
      this.contaForm.setValue({
        username: userConta.username,
        numeroConta: userConta.numero,
        limiteConta: userConta.limite,
        saldoConta: this.currencyPipe.transform(userConta.saldo, 'BRL', 'symbol-narrow', '1.2-2'),
        tipoConta: userConta.tipo || ''
      });
    });

  }


  get numeroConta() {
    return this.contaForm.get('numeroConta');
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
  }

  onSubmit() {
    if (this.contaForm.valid.valueOf()) {
      const username = this.contaForm.value.usernameConta;
      const numero = this.contaForm.value.numeroConta;
      const saldo = this.conta.saldo;
      const limite = this.contaForm.value.limiteConta;
      const tipo = this.contaForm.value.tipoConta;
      const id = this.conta.id;
      const saveConta = { username, numero, saldo, limite, tipo, id };
      this.contaService.updateConta(saveConta);
    }
  }
}

