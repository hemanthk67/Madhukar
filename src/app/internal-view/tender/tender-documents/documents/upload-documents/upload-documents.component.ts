import { Component, OnInit } from '@angular/core';
import { TenderService } from 'src/app/services/internal/tender/tender.service';
import { InfoService } from 'src/app/services/internal/info.service';




class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();
  constructor(file: File) {
    this.file = file;
  }
}
@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent implements OnInit {
  onceFlag = true;
  allFiles: any;
  uploadFile: FileList;
  presentDocumentsFlag = true;
  commonDocumentsFlag = true;
  commonDocumentType = 'attested';
  commonFile: Upload;
  currentFile: Upload;
  commonDocuments = [];
  experianceDocuemnts =[];
  constructor(public tenderService: TenderService,
    public infoService:InfoService) { }

  ngOnInit() {
    this.commonDocuments = this.infoService.commonDocuments;
    for( let i =0; i< this.commonDocuments.length; i++) {
      this.commonDocuments[i].flag  = false;
      for( let j = 0; j < this.tenderService.tender.files.uploadedDocuments.length; j++) {
     if( this.tenderService.tender.files.uploadedDocuments[j].name == this.commonDocuments[i].name) {
      this.commonDocuments[i].flag  = true;
     }
      }
      
    }
    this.experianceDocuemnts = this.infoService.experienceDocuments;
    for( let i =0; i< this.experianceDocuemnts.length; i++) {
      this.experianceDocuemnts[i].flag  = false;
       for( let j = 0; j < this.tenderService.tender.files.uploadedDocuments.length; j++) {
        if( this.tenderService.tender.files.uploadedDocuments[j].name == this.experianceDocuemnts[i].name) {
         this.experianceDocuemnts[i].flag  = true;
        }
         }
    } 
  }

  detectFile(event) {
    this.uploadFile = event.target.files;
       if (this.allFiles) {
        for (let i = 0; i < this.uploadFile.length; i++) {
          this.allFiles[this.allFiles.length] = this.uploadFile[i];
        }
    } else {
      this.allFiles = Array.from(this.uploadFile);
    }
    for (let i = 0; i < this.allFiles.length; i++) {
      for( let j = 0; j < this.tenderService.tender.files.uploadedDocuments.length; j++) {
        if( this.tenderService.tender.files.uploadedDocuments[j].name == this.allFiles[i].name) {
          alert('File - ' + this.allFiles[i].name + 'already exist')
         this.allFiles.splice(i,1);
         i--;
         j= this.tenderService.tender.files.uploadedDocuments.length - 1;
        }
         }
    }
  }

  deleteFile(value: any) {
    this.allFiles.splice(value, 1);
  }
  uploadDocumentFlag() {
    this.presentDocumentsFlag = !this.presentDocumentsFlag;
  }
  onCommonChange(i,name) {
    this.commonDocuments[i].flag = !this.commonDocuments[i].flag;
    var document = {
      name: this.commonDocuments[i].name,
      path: this.commonDocuments[i].path
    };
    if(this.tenderService.tender.files.uploadedDocuments.length == 0) {
      this.tenderService.tender.files.uploadedDocuments.push(document);
    } else {
    for( let j = 0; j < this.tenderService.tender.files.uploadedDocuments.length; j++) {
      if( this.tenderService.tender.files.uploadedDocuments[j].name == name) {
        this.tenderService.tender.files.uploadedDocuments.splice(j,1);
        break;
      } else if ( j+1 == this.tenderService.tender.files.uploadedDocuments.length) {
        this.tenderService.tender.files.uploadedDocuments.push(document);
        break;
      }
       }
      }
       console.log(this.tenderService.tender.files.uploadedDocuments);
  }
  detectcommonFile(event) {
    this.commonFile = event.target.files[0];
  }
  deleteCommonFile() {
    (<HTMLInputElement>document.getElementById("common-document-id")).value = "";
    this.commonFile = null;
  }
  commonDocumentUpload() {
    for( let i =0; i< this.commonDocuments.length; i++) {
    if(this.commonFile.name == this.commonDocuments[i].name) {
alert('Folder Already Exists');
return 0;
    }
    }
    this.tenderService.uploadCommonFile(this.commonFile, this.tenderService.tender, this.commonDocumentType);
    this.commonFile = null;
    this.commonDocumentsFlag = !this.commonDocumentsFlag;
  }
  onExperienceChange(i,name) {
    this.experianceDocuemnts[i].flag = !this.experianceDocuemnts[i].flag;
    var document = {
      name: this.experianceDocuemnts[i].name,
      path: this.experianceDocuemnts[i].path
    };
    if(this.tenderService.tender.files.uploadedDocuments.length == 0) {
      this.tenderService.tender.files.uploadedDocuments.push(document);
    } else {
    for( let j = 0; j < this.tenderService.tender.files.uploadedDocuments.length; j++) {
      if( this.tenderService.tender.files.uploadedDocuments[j].name == name) {
        this.tenderService.tender.files.uploadedDocuments.splice(j,1);
        break;
      } else if ( j+1 == this.tenderService.tender.files.uploadedDocuments.length) {
        this.tenderService.tender.files.uploadedDocuments.push(document);
        break;
      }
       }
      }
       console.log(this.tenderService.tender.files.uploadedDocuments);
  }
  attatchDocuments() {
    this.tenderService.attatchDocuments();
    this.onceFlag = false;
  }
  commonAddDocuments() {
    this.commonDocumentsFlag = !this.commonDocumentsFlag;
  }
  commonDocumentTypeChange(type) {
    if (this.commonDocumentType == type) {
      this.commonDocumentType = 'attested';
    } else {
      this.commonDocumentType = type;
    }
  }
  public uploadFiles() {
    
    this.presentDocumentsFlag = !this.presentDocumentsFlag;
    this.tenderService.uploadManuualFiles(this.tenderService.tender ,this.allFiles);
    this.allFiles = [];
  }
}
