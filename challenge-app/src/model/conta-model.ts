'use strict';
/**
 * Class responsible to generate new Account on the Store
 */
import { Injectable } from '@angular/core';

@Injectable()
export class ContaModel {

    numero: number;
    username: any;
    saldo: number;
    limite: number;
    tipo: string;
    id?: any;


  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.numero = obj.numero;
    this.saldo = obj.saldo;
    this.limite = obj.limite;
    this.tipo =  obj.tipo;
    this.username = obj.username;
  }


}
