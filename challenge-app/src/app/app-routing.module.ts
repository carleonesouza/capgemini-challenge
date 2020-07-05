import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { ContaComponent, MostaSaldoComponent } from '../pages/conta/conta.component';
import { AddContaComponent } from '../pages/add-conta/add-conta.component';
import { DepositaComponent } from '../pages/deposita/deposita.component';
import { SacaContaComponent } from '../pages/saca-conta/saca-conta.component';
import { EditContaComponent } from '../pages/edit-conta/edit-conta.component';
import { AuthGuard } from '../guards/authGuard';
import { LoginComponent } from '../pages/login/login.component';
import { BaseComponent } from './base.component';

const routes: Routes = [
      { path: '', component: BaseComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'conta', component: ContaComponent, canActivate: [AuthGuard] },
      { path: 'deposita', component: DepositaComponent, canActivate: [AuthGuard]},
      { path: 'saca', component: SacaContaComponent, canActivate: [AuthGuard] },
      { path: 'edit-conta', component: EditContaComponent, canActivate: [AuthGuard]},
      { path: 'saldo', component: MostaSaldoComponent, canActivate: [AuthGuard]},
      { path: 'login', component: LoginComponent},
      { path: 'add-conta', component: AddContaComponent },
       // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
