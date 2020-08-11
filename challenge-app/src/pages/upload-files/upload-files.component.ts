import { Component, OnInit, OnDestroy, Input, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { DropzoneDirective } from 'ngx-dropzone-wrapper';
import { Subscription } from 'rxjs/Subscription';
import { FileUploadService } from '../../service/fileUpload.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent  implements OnInit, OnDestroy {

  @Input() formulario: FormGroup;
  uploadForm = new FormArray([]);
  @ViewChild(DropzoneDirective) directiveRef: any;
  @Input() readOnly: boolean;

  @ViewChild('ele') elem: ElementRef;

  tamanhoArquivoAtual: any;
  nomeArquivoAtual: any;
  condition: boolean;
  descricaoForm: FormGroup;
  indexAtual: any;
  MAX_FILES = 10;
  FILES_ADDED_MANUALLY = 0;
  imageDataUrl: any;
  subscriptions: Subscription[] = [];


  constructor(private fileUploadService: FileUploadService,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {

    this.subscribeEvents();

    this.descricaoForm = this.fb.group({
      descricao: [null, ]
    });

  }

  ngOnInit() {


    // this.imageDataUrl = imageUrl;

  }

teste() {
  if (this.condition === false) {
    this.condition = true;
  } else {
    this.condition = false;
  }
}


  closeModal() {

    this.descricaoForm.reset();

  }

  updateDescricao() {

    const control = this.getControlAtual();

    this.setDescricaoAtual(control);
    this.verifyIfShowDescricao(control.value.descricao);

  }

  setDescricaoAtual(control) {

    const spanChild = this.getDzFileNameElement().firstChild;

    control.value.descricao = this.descricaoForm.controls.descricao.value || '';

    if (spanChild.firstChild) {

      this.renderer.setValue(spanChild.firstChild, control.value.descricao);

    } else {

      const text = this.renderer.createText(control.value.descricao);
      this.renderer.appendChild(spanChild, text);

    }

  }

  getControlAtual() {
    return this.uploadForm.controls.find((c) =>
    c.value.uuid && c.value.uuid === this.indexAtual || c.value.id && c.value.id === this.indexAtual);

  }

  getDzFileNameElement() {

    return this.getElementByIndex().parentElement.parentElement.getElementsByClassName('dz-filename')[0];

  }

  getImgElement() {

    return this.getElementByIndex().parentElement.parentElement.getElementsByClassName('dz-image')[0].getElementsByTagName('img')[0];

  }

  getElementByIndex() {

    const template = this.directiveRef.elementRef.nativeElement;

    return template.getElementsByClassName(this.indexAtual)[0];

  }

  ngOnDestroy() {

    this.subscriptions.forEach(element => element.unsubscribe());

  }

  subscribeEvents() {

    this.subscriptions.push(this.fileUploadService.patchUploads$
      .subscribe((uploadFiles: any) => this.patchuploadFiles(uploadFiles)));

  }

  patchuploadFiles(uploadFiles: any[]) {

    uploadFiles.forEach((uploadFiles, index) => {

      this.uploadForm.setControl(index, new FormControl());

     /*  this.documentoService.findImage(uploadFiles.nome)
        .subscribe((response) => {

          const reader = new FileReader;

          reader.readAsDataURL(response.body);
          reader.onloadend = () => this.createuploadFilesElement(response, reader, uploadFiles);

        }); */

    });

    this.FILES_ADDED_MANUALLY = uploadFiles.length;
    this.uploadForm.patchValue(uploadFiles);
    this.directiveRef.dropzone().options.maxFiles = this.MAX_FILES - this.FILES_ADDED_MANUALLY;

  }

  createuploadFilesElement(response, reader, uploadFiles) {

    const dropzone = this.directiveRef.dropzone();
    const dataURL = reader.result;
    const mockFile = {

      id: uploadFiles.id,
      name: uploadFiles.descricao,
      dataURL: dataURL,
      size: response.headers.get('content-length')

    };

    dropzone.files.push(mockFile);
    dropzone.emit('addedfile', mockFile);
    dropzone.createThumbnailFromUrl(mockFile,
      dropzone.options.thumbnailWidth,
      dropzone.options.thumbnailHeight,
      dropzone.options.thumbnailMethod,
      true, (thumbnail) => {
        dropzone.emit('thumbnail', mockFile, thumbnail);
        dropzone.emit('complete', mockFile);
      });

    const indexName = mockFile.id;
    this.indexAtual = mockFile.id;

    this.setKeyClass(this.indexAtual);
    this.verifyIfShowDescricao(uploadFiles.descricao);

   /*  if (this.readOnly) {

      this.hideCloseIconElement();
      $('.dz-hidden-input').prop('disabled', true);

    }

    $('.' + indexName).unbind().click(() => 
    this.registerModalValues(indexName, uploadFiles.nome, mockFile.size, uploadFiles.descricao));
 */
  }

  verifyIfShowDescricao(descricao?) {

    if (descricao) {

      this.renderer.removeClass(this.getDzFileNameElement(), 'd-none');
      this.renderer.removeClass(this.getImgElement(), 'no-filter');

    } else {

      this.renderer.addClass(this.getDzFileNameElement(), 'd-none');
      this.renderer.addClass(this.getImgElement(), 'no-filter');

    }

  }

  getDzImageElement() {

    const template = this.directiveRef.elementRef.nativeElement;

    return template.lastChild.getElementsByTagName('img')[0];

  }

  onUploadSuccess(success: any) {
    console.log(success);
    const control = new FormControl({ key: success[1],
       nomeOriginal: success[0].name, descricao: undefined, uuid: success[0].upload.uuid });

    this.uploadForm.push(control);
    this.uploadForm.markAsDirty();
    const indexName = success[0].upload.uuid;


    this.indexAtual = indexName;
    this.showOrHideDzMessage();
    this.setKeyClass(success[0]);
    this.clearDzFileName(success[0]);
    this.verifyIfShowDescricao();

  }

  hideCloseIconElement() {

    this.renderer.addClass(this.getElementByIndex().parentElement.getElementsByClassName('fa-close')[0], 'd-none');

  }

  setKeyClass(file) {

    this.renderer.addClass(this.getUploadFilesClassNameElement(file), this.indexAtual);

  }

  clearDzFileName(file) {

    this.renderer.setValue(file.previewElement.getElementsByClassName('dz-filename')[0].firstElementChild.firstChild, null);

  }

  registerModalValues(indexName, nomeArquivoAtual, size, descricao) {

    this.indexAtual = indexName;
    this.nomeArquivoAtual = nomeArquivoAtual;
    this.tamanhoArquivoAtual = parseFloat((size / 1024).toString()).toFixed(2);
    this.descricaoForm.controls.descricao.patchValue(descricao);

  }

  getUploadFilesClassNameElement(file?) {

    const template = this.directiveRef.elementRef.nativeElement;

    return file ? file.previewElement.getElementsByClassName('uploadFiles')[0]
      : template.lastChild.getElementsByClassName('uploadFiles')[0];

  }

  onUploadError(file: any) {

    const divError = this.directiveRef.elementRef.nativeElement;
    this.renderer.removeChild(divError, divError.lastChild);

    this.showOrHideDzMessage();

  }

  onRemovedFile($event: any) {

    let indexToRemove;

    this.uploadForm.value.forEach((uploadFiles, index) => {

      if (uploadFiles.uuid && (uploadFiles.uuid === $event.upload.uuid)
        || uploadFiles.id && (uploadFiles.id === $event.id)) {

        indexToRemove = index;

      }

    });

    if (this.FILES_ADDED_MANUALLY > 0 && this.FILES_ADDED_MANUALLY === this.uploadForm.value.length) {

      this.directiveRef.dropzone().options.maxFiles = this.MAX_FILES - --this.FILES_ADDED_MANUALLY;

    }

    this.indexAtual = undefined;
    this.uploadForm.removeAt(indexToRemove);
    this.uploadForm.markAsDirty();

    this.showOrHideDzMessage();

  }

  showOrHideDzMessage() {

    const dropzone = this.directiveRef.elementRef.nativeElement;

    if (this.uploadForm.value.length === 0) {

      this.renderer.addClass(dropzone.firstChild, 'd-block');
      this.renderer.removeClass(dropzone.firstChild, 'd-none');

    } else {

      this.renderer.addClass(dropzone.firstChild, 'd-none');
      this.renderer.removeClass(dropzone.firstChild, 'd-block');

    }

  }


}
