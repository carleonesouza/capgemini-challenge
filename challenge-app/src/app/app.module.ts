import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialAppModule} from '../material-app';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from '../pages/home/home.component';
import { ContaComponent, MostaSaldoComponent } from '../pages/conta/conta.component';
import { AddContaComponent } from '../pages/add-conta/add-conta.component';
import { ContaService } from '../service/conta.service';
import { SacaContaComponent } from '../pages/saca-conta/saca-conta.component';
import { DepositaComponent } from '../pages/deposita/deposita.component';
import { EditContaComponent } from '../pages/edit-conta/edit-conta.component';
import { UploadFilesComponent } from '../pages/upload-files/upload-files.component';
import { CurrencyPipe } from '@angular/common';
import { LoginComponent } from '../pages/login/login.component';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../guards/authGuard';
import { BaseComponent } from './base.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { dropzoneTemplate } from '../pages/upload-files/dropzone-template';
import { FileUploadService } from '../service/fileUpload.service';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
 // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 10,
  addRemoveLinks: true,
  clickable: true,
  acceptedFiles: 'application/pdf',
  previewTemplate: dropzoneTemplate
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseComponent,
    ContaComponent,
    AddContaComponent,
    SacaContaComponent,
    DepositaComponent,
    EditContaComponent,
    MostaSaldoComponent,
    LoginComponent,
    UploadFilesComponent
  ],
  imports: [
    BrowserModule,
    DropzoneModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialAppModule,
    AppRoutingModule
  ],
  entryComponents: [
    AppComponent
  ],
  providers: [ContaService, CurrencyPipe, AuthService, FileUploadService,
    AuthGuard,   {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
