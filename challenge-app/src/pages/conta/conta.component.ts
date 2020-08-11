import { Component, OnInit, HostListener, Input } from '@angular/core';
import { ContaService } from '../../service/conta.service';
import { ContaModel } from '../../model/conta-model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
selector: 'app-mostra-saldo',
templateUrl: './mostra-saldo.component.html',
styleUrls: ['./conta.component.scss']
})

export class MostaSaldoComponent  implements OnInit {
  userId;
  userSaldo;

  constructor(private contaService: ContaService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('mSessionId');
    this.contaService.mostraSaldo(this.userId).subscribe((valor) => {
      this.userSaldo = valor;
    });
  }

}

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {

  mobileMode = false;
  @Input() dropzoneForm: FormGroup;
  files: File[] = [];
  userConta = new ContaModel();

  constructor(private contaService: ContaService, private formBuilder: FormBuilder) {
    const deviceMobile = window.navigator.userAgent.toLowerCase().includes('mobi');
    if (deviceMobile) {
      this.mobileMode = true;
    } else {
      this.mobileMode = false;
    }
  }

  ngOnInit() {
    this.contaService.getContaById(localStorage.getItem('mSessionId')).subscribe((conta: ContaModel) => {
      this.userConta = conta;
    });
    this.dropzoneForm = this.formBuilder.group({
      usernameConta: ['', ],
      arquivoConta: []
    });

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
    onUploadError($event) {
      console.log($event);
    }
    onUploadSuccess(args: any) {
      console.log(args.map(file => file ));
      // this.dropzoneForm.controls['documento'].get('nomeOriginal').setValue(args);
    }


}
