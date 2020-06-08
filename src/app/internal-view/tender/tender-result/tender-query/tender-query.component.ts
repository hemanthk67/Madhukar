import { Component, OnInit } from '@angular/core';
import { TenderService } from 'src/app/services/internal/tender/tender.service';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tender-query',
  templateUrl: './tender-query.component.html',
  styleUrls: ['./tender-query.component.scss']
})
export class TenderQueryComponent implements OnInit {
  allFiles: any;
  uploadFile: FileList;
  private textareaValueQuery = '';
  private textareaValueQueryReply = '';
  constructor(    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public tenderService: TenderService) { 
      iconRegistry.addSvgIcon(
        "pdf-icon",
        sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pdf-icon.svg")
      );
      iconRegistry.addSvgIcon(
        "cloud-cross-icon",
        sanitizer.bypassSecurityTrustResourceUrl(
          "assets/icons/cloud-cross-icon.svg"
        )
      );
    }

  ngOnInit() {
       setTimeout(
      function() {
        this.tenderService.tender = this.tenderService.data[this.tenderService.data.length - 3]
        console.log(this.tenderService.tender.files);
      }.bind(this),
      2000
    );

    
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
  }

  deleteFile(value: any) {
    this.allFiles.splice(value, 1);
  }

  doTextareaValueChange(ev, type) {
    if(type == 'query') {
    try {
      this.textareaValueQuery = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  } else if (type == 'reply') {
    try {
      this.textareaValueQueryReply = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }
  }
  public submitReply(index) {
    console.log(index);
  }
  public submitQuery() {
    this.tenderService.querySubmission(this.tenderService.tender ,this.allFiles, this.textareaValueQuery, this.textareaValueQueryReply);
    this.textareaValueQuery = '';
    this.textareaValueQueryReply = '';
    this.allFiles = [];
  }
}
