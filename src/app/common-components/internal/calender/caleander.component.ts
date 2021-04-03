import { Component, OnInit ,Output ,EventEmitter } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-calender",
  templateUrl: "./calender.component.html",
  styleUrls: ["./calender.component.scss"]
})
export class CalenderComponent implements OnInit {
  @Output() dateEmit = new EventEmitter();
  currentYear = new Date().getFullYear();
  years = [ {name:'1950-58',
value:1954},
{name:'1959-67',
value:1963},
{name:'1968-76',
value:1972},
{name:'1977-85',
value:1981},
{name:'1986-94',
value:1990},
{name:'1995-03',
value:1999},
{name:'2004-12',
value:2008},
{name:'2013-21',
value:2017},
{name:'2022-30',
value:2026}]
  year = [];
  dateInputNumber = {
    year: this.currentYear,
    month:null,
    date:null
  };
  dateInput = {
    years: true,
    year: this.currentYear,
    month:null,
    date:null
  };
  dates = [{
    month: 'Jan',
    date: this.getNumberofMonths(1) },
    {
      month: 'Feb',
      date: this.getNumberofMonths(2) },
    {
      month: 'Mar',
      date:this.getNumberofMonths(3) },
    {
      month: 'Apr',
      date:this.getNumberofMonths(4) },
    {
      month: 'May',
      date: this.getNumberofMonths(5) },
    {
      month: 'Jun',
      date: this.getNumberofMonths(6) },
    {
      month: 'Jly',
      date: this.getNumberofMonths(7) },
    {
      month: 'Aug',
      date: this.getNumberofMonths(8) },
    {
      month: 'Sep',
      date: this.getNumberofMonths(9) },
    {
      month: 'Oct',
      date: this.getNumberofMonths(10) },
    {
      month: 'Nov',
      date: this.getNumberofMonths(11) },
    {
      month: 'Dec',
      date: this.getNumberofMonths(12) }];
  constructor(    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "back-button-calander",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/back-button-calander.svg")
    );
  }

  ngOnInit() {}
  getNumberofMonths(month) {
    return new Date(this.dateInputNumber.year,month,0).getDate();
  }
  dateselected(value,i) {
    if(this.dateInput.year) {
      if(this.dateInput.month) {
         if(!this.dateInput.date) {
          this.dateInput.date = value;
          this.dateInputNumber.date = value;
          this.dateEmit.emit(this.dateInputNumber.date + '/' + this.dateInputNumber.month + '/' + this.dateInputNumber.year);
         }
      } else {
         this.dateInput.month = value;
         this.dateInputNumber.month = i +1;
      }
    } else {
      if (this.dateInput.years) {
      this.dateInput.year = value;
      this.dateInputNumber.year = value;
      } else {
        this.dateInput.years = true;
      this.dateInputNumber.year = value;
      }
    }
  } 
  back() {
    if(this.dateInput.years) {
    if(this.dateInput.year) {
      if(this.dateInput.month) {
         if(!this.dateInput.date) {
          this.dateInput.month = null;
          this.dateInputNumber.month = null;
         }
      } else {
         this.dateInput.year = null;
        //  this.dateInputNumber.year = null;
      }
    } else {
      this.dateInput.years = false;
    }
  } else {
    this.dateEmit.emit(null);
  }
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }
}
