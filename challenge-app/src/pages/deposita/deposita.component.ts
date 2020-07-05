import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContaService } from '../../service/conta.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-deposita',
  templateUrl: './deposita.component.html',
  styleUrls: ['./deposita.component.scss']
})
export class DepositaComponent implements OnInit {

  @Input() contaForm: FormGroup;

  constructor(private contaService: ContaService, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar, private router: Router) { }

              ngOnInit() {
                this.contaForm = this.formBuilder.group({
                  contaId: ['', [Validators.required, Validators.minLength(3)]],
                  valorDeposito: ['', [Validators.required, Validators.minLength(3)]],
                });
              }


  get contaId() {
    return this.contaForm.get('contaId');
  }

  get valorDeposito() {
    return this.contaForm.get('valorDeposito');
  }

  onNoClick() {
    this.contaForm.reset();
  }

  onSubmit() {
    if (this.contaForm.valid.valueOf()) {
      const id_conta = this.contaForm.value.contaId;
      const valor = this.contaForm.value.valorDeposito;
      const depositoConta = { id_conta, valor };
      this.contaService.depositaConta(depositoConta).subscribe(
        (e) => {
            this.snackBar.open('Deposito realizado com sucesso! ', '', {duration: 4000});
            this.router.navigate(['/conta']);
        },  (err: HttpErrorResponse) => {
          this.snackBar.open('Error occurred this process', 'RETRY', { duration: 4000 });
          console.log(err);
        }
      );

    }
  }

}
