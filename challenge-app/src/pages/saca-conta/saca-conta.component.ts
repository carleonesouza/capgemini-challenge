import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContaService } from '../../service/conta.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-saca-conta',
  templateUrl: './saca-conta.component.html',
  styleUrls: ['./saca-conta.component.scss']
})
export class SacaContaComponent implements OnInit {

  @Input() contaForm: FormGroup;

  constructor(private contaService: ContaService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, private router: Router) { }

              ngOnInit() {
                this.contaForm = this.formBuilder.group({
                  contaId: ['', [Validators.required, Validators.minLength(3)]],
                  valorSaque: ['', [Validators.required, Validators.minLength(3)]],
                });
              }


  get contaId() {
    return this.contaForm.get('contaId');
  }

  get valorSaque() {
    return this.contaForm.get('valorSaque');
  }

  onNoClick() {
    this.contaForm.reset();
  }

  onSubmit() {
    if (this.contaForm.valid.valueOf()) {
      const id_conta = this.contaForm.value.contaId;
      const valor = this.contaForm.value.valorSaque;
      const saqueConta = { id_conta, valor };
      this.contaService.sacaConta(saqueConta).subscribe(
        (e) => {
          if (e === true) {
            this.snackBar.open('Saque realizado com sucesso! ', '', {duration: 4000});
            this.router.navigate(['/conta']);
          } else {
            this.contaForm.reset();
            this.snackBar.open('Valor excede o Limite! ', '', {duration: 4000});
          }
        },  (err: HttpErrorResponse) => {
          this.snackBar.open('Error occurred this process', 'RETRY', { duration: 4000 });
          console.log(err);
        });
    }
  }
}
