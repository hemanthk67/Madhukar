import { Component, OnInit } from '@angular/core';
import { TenderService } from 'src/app/services/internal/tender/tender.service';

@Component({
  selector: 'app-complete-tender',
  templateUrl: './complete-tender.component.html',
  styleUrls: ['./complete-tender.component.scss']
})
export class CompleteTenderComponent implements OnInit {

  constructor(public tenderService: TenderService) { }

  ngOnInit() {
  }

}
