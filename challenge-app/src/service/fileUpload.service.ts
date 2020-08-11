import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FileUploadService {

    private patchFilesUpload = new Subject<void>();
    patchUploads$ = this.patchFilesUpload.asObservable();

    constructor() {
    }

    setFiless(files: any) {

        this.patchFilesUpload.next(files);

    }

}