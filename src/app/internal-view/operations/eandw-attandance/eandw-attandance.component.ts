import { Component, OnInit } from '@angular/core';
import { OperationsService } from 'src/app/services/internal/operations/operations.service';

@Component({
  selector: 'app-eandw-attandance',
  templateUrl: './eandw-attandance.component.html',
  styleUrls: ['./eandw-attandance.component.scss']
})
export class EandwAttandanceComponent implements OnInit {
  types = [
    'Workers',
    'Employees'
  ];
  weeks = [
    { number: 1,
      name: 'Week-1',
      flag:true,
      dates : [20,21,22,23,24,25,26,27],
      days : []
     },{number: 2,
      name: 'Week-2',
      flag:false,
      dates : [28,29,30,31,1,2,3],
      days : []
     },{number: 3,
      name: 'Week-3',
      flag:false,
      dates : [4,5,6,7,8,9,10],
      days : []
     },{number: 4,
      name: 'Week-4',
      flag:false,
      dates : [11,12,13,14,15,16,17],
      days : []
     },{number: 5,
      name: 'Week-5',
      flag:false,
      dates : [18,19,20,21],
      days : []
     },{number: 6,
      name: 'Final',
      flag:false,
      dates : [],
      days : []
     }
  ];
  attandancePerEmployee = {
name: '',
number: '',
type: '',
weeks:[],
dates: []
  };
  newAttandance = [{dates:[], weeks:[]}];
  days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  months = ['Jan-Feb', 'Feb-Mar', 'Mar-Apr', 'Apr-May', 'May-Jun', 'Jun-Jul', 'Jul-Aug', 'Aug-Sep', 'Sep-Oct', 'Oct-Nov', 'Nov-Dec', 'Dec-Jan'];
  years = ['2020','2021', '2022'];
  selectedMonth: any;
  selectedYear: any;
  date : Date;
  startFlag = true;
  submitFlag = false;
  constructor(public operations: OperationsService) { 
    this.date =new Date();
      this.selectedMonth = this.date.getMonth();
      this.selectedYear = this.date.getFullYear();
      var dateProperties = {
        date: 0, 
  holiday: false, 
  compensationHoliday: false, 
  weekOff: false,
      }
      for(let i=0; i < this.weeks.length; i++) {
        for(let j=0; j < this.weeks[i].dates.length; j++) {
          this.weeks[i].days[j] = this.dayByDate(this.weeks[i].dates[j]);
          if(this.weeks[i].days[j] !== null) {
          dateProperties.date = this.weeks[i].dates[j]
          this.newAttandance[0].dates.push({...dateProperties});
          }
        }
      }
  }

  ngOnInit() {
  }
  selectWeek(index) {
    this.submitFlag = false;
    if(this.weeks[index].number == 6) {
      this.submitFlag = true;
    }
    for(let i = 0; i < this.weeks.length; i++) {
      this.weeks[i].flag = false;
    }
    const weekIndex = this.weeks[index].number;
    this.weeks[index].flag = true;
    var week = this.weeks[index];
    this.weeks.splice(index, 1);
    this.weeks.unshift(week);
    if(weekIndex < 6) {
      for(let i =0 ; i < this.operations.employeeData.length; i++) {
        this.getTimeDifference(i , weekIndex);     
       }
      }

  }
  dayByDate(date) {
    var presentDate =  '/' + date + '/';
    if(date > 20) {
      presentDate = this.selectedMonth + presentDate + this.selectedYear;
    } else {
      presentDate = (this.selectedMonth +1) + presentDate + this.selectedYear;
    }
    const presentDay = new Date(presentDate).getDay();

    if( (date == 29 || date == 30 || date == 31) && this.selectedMonth == new Date(presentDate).getMonth()) {
      return null;
    }
    
    return presentDay
  }
  getAttandanceArrayIndex(data, weekNumber) {
        if (weekNumber == 1) {
            return data -20;
        } else {
        if(data > 21) {
          return data -20;
        } else {
          return data +10
        }
      }
  }
  weekRole(type, index, weekIndex) {
     if(type == 'H') {
      for(let i =0 ; i < this.newAttandance.length; i++) {
       this.newAttandance[i].dates[index].holiday = !this.newAttandance[i].dates[index].holiday;
       this.newAttandance[i].dates[index].compensationHoliday = false;
       this.newAttandance[i].dates[index].weekOff = false;
       if( i !== 0 && this.newAttandance[i].dates[index].holiday) {
        this.newAttandance[i].dates[index].timeIn = "00:00";
        this.newAttandance[i].dates[index].timeOut = "00:00";
       } else if(i !== 0) {
        this.newAttandance[i].dates[index].timeIn = '09:00';
        this.newAttandance[i].dates[index].timeOut = '17:30';
       }
      }
     } else if(type == 'CH') {
      for(let i =0 ; i < this.newAttandance.length; i++) {
        this.newAttandance[i].dates[index].holiday = false;
        this.newAttandance[i].dates[index].compensationHoliday = !this.newAttandance[i].dates[index].compensationHoliday;
        this.newAttandance[i].dates[index].weekOff = false;
        if( i !== 0 && this.newAttandance[i].dates[index].compensationHoliday) {
          this.newAttandance[i].dates[index].timeIn = "00:00";
          this.newAttandance[i].dates[index].timeOut = "00:00";
         } else if(i !== 0) {
          this.newAttandance[i].dates[index].timeIn = '09:00';
          this.newAttandance[i].dates[index].timeOut = '17:30';
         }
       }
     } else if( type == 'WO') {
      for(let i =0 ; i < this.newAttandance.length; i++) {
        this.newAttandance[i].dates[index].holiday = false;
        this.newAttandance[i].dates[index].compensationHoliday = false;
        this.newAttandance[i].dates[index].weekOff = !this.newAttandance[i].dates[index].weekOff;
        if( i !== 0 && this.newAttandance[i].dates[index].weekOff ) {
          this.newAttandance[i].dates[index].timeIn = "00:00";
          this.newAttandance[i].dates[index].timeOut = "00:00";
         } else if(i !== 0) {
          this.newAttandance[i].dates[index].timeIn = '09:00';
          this.newAttandance[i].dates[index].timeOut = '17:30';
         }
       }
       
     } 
     for(let i =0 ; i < this.operations.employeeData.length; i++) {
      this.getTimeDifference(i , weekIndex);
     }
  }

    dayRole (type, index, weekIndex) {
      if(type == 'L') {
        for(let i =0 ; i < this.newAttandance.length; i++) {
         this.newAttandance[i].dates[index].leave = !this.newAttandance[i].dates[index].leave;
         this.newAttandance[i].dates[index].absent = false;
          if (i !== 0 && (this.newAttandance[i].dates[index].compensationHoliday || i !== 0 && this.newAttandance[i].dates[index].weekOff || this.newAttandance[i].dates[index].holiday )) {
          this.newAttandance[i].dates[index].timeIn = "00:00";
          this.newAttandance[i].dates[index].timeOut = "00:00";
         } else if( i !== 0 && this.newAttandance[i].dates[index].leave) {
          this.newAttandance[i].dates[index].timeIn = '09:00';
          this.newAttandance[i].dates[index].timeOut = '17:30';
         }  else if(i !== 0) {
          this.newAttandance[i].dates[index].timeIn = '09:00';
          this.newAttandance[i].dates[index].timeOut = '17:30';
         }
        }
       } else if(type == 'A') {
        for(let i =0 ; i < this.newAttandance.length; i++) {
          this.newAttandance[i].dates[index].absent = !this.newAttandance[i].dates[index].absent;
          this.newAttandance[i].dates[index].leave = false;
          if( i !== 0 && this.newAttandance[i].dates[index].absent) {
            this.newAttandance[i].dates[index].timeIn = "00:00";
            this.newAttandance[i].dates[index].timeOut = "00:00";
           } else if (i !== 0 && (this.newAttandance[i].dates[index].compensationHoliday || i !== 0 && this.newAttandance[i].dates[index].weekOff || this.newAttandance[i].dates[index].holiday )) {
            this.newAttandance[i].dates[index].timeIn = "00:00";
            this.newAttandance[i].dates[index].timeOut = "00:00";
           } else if(i !== 0) {
            this.newAttandance[i].dates[index].timeIn = '09:00';
            this.newAttandance[i].dates[index].timeOut = '17:30';
           }
         }
       }
       if(weekIndex < 6) {
       for(let i =0 ; i < this.operations.employeeData.length; i++) {
        this.getTimeDifference(i , weekIndex);
       }
      }
    }
  start() {
    if(this.startFlag) {
      var dateProperties = {date: 0, 
        timeIn: '09:00', 
        timeOut: '17:30', 
        holiday: false, 
        compensationHoliday: false, 
        weekOff: false,
        leave: false,
        absent: false
      };
      for(let i =0 ; i < this.operations.employeeData.length; i++) {
        this.attandancePerEmployee.name = this.operations.employeeData[i].name;
        this.attandancePerEmployee.number = this.operations.employeeData[i].number;
        this.attandancePerEmployee.type = this.operations.employeeData[i].type;
        this.attandancePerEmployee.weeks = [{weekHrs: 0, compensationHrs:  0, otHrs: 0 , holidayHrs: 0, weekOffHrs: 0}, {weekHrs: 0, compensationHrs:  0, otHrs: 0 , holidayHrs: 0, weekOffHrs: 0}, {weekHrs: 0, compensationHrs:  0, otHrs: 0 , holidayHrs: 0, weekOffHrs: 0}, {weekHrs: 0, compensationHrs:  0, otHrs: 0 , holidayHrs: 0, weekOffHrs: 0}, {weekHrs: 0, compensationHrs:  0, otHrs: 0 , holidayHrs: 0, weekOffHrs: 0}];
        for(let i=0; i < this.weeks.length - 1; i++){
          this.attandancePerEmployee.weeks[i].weekHrs = 0;
          for(let j=0; j < this.weeks[i].dates.length; j++) {
            this.weeks[i].days[j] = this.dayByDate(this.weeks[i].dates[j]);
            if(this.weeks[i].days[j] !== null) {
              if(this.weeks[i].number == 1 &&  this.weeks[i].dates[j] == 20) {
                dateProperties.date = this.weeks[i].dates[j];
                this.attandancePerEmployee.dates.push({...dateProperties});
                this.attandancePerEmployee.weeks[i].weekHrs = this.attandancePerEmployee.weeks[i].weekHrs + 0;
              } else if(this.weeks[i].number == 5 &&  this.weeks[i].dates[j] == 21) {
                dateProperties.date = this.weeks[i].dates[j];
                this.attandancePerEmployee.dates.push({...dateProperties});
                this.attandancePerEmployee.weeks[i].weekHrs = this.attandancePerEmployee.weeks[i].weekHrs + 0;
              } else {
            dateProperties.date = this.weeks[i].dates[j];
            this.attandancePerEmployee.dates.push({...dateProperties});
            this.attandancePerEmployee.weeks[i].weekHrs = this.attandancePerEmployee.weeks[i].weekHrs + 8;
              }
            }
          }
        }
        this.newAttandance.push({...this.attandancePerEmployee});
      }
      console.log(this.newAttandance);
     
  this.startFlag = false;
    }
    return true;
  }
  getTimeDifference(employeeIndex, weekIndex) {
    weekIndex = weekIndex - 1;
    employeeIndex = employeeIndex + 1;
      this.newAttandance[employeeIndex].weeks[weekIndex].weekHrs = 0;
      this.newAttandance[employeeIndex].weeks[weekIndex].otHrs = 0;
      this.newAttandance[employeeIndex].weeks[weekIndex].compensationHrs = 0;
      this.newAttandance[employeeIndex].weeks[weekIndex].holidayHrs = 0;
      this.newAttandance[employeeIndex].weeks[weekIndex].weekOffHrs = 0;
      var week = weekIndex;
      for(let j=0; j < this.weeks[0].dates.length; j++) {
        if(this.weeks[0].days[j] !== null) {
        if(week == 0) {
          week = 1;
          j = j + 1;
        }
        if( week == 4 && j == this.weeks[0].dates.length - 1) {
          break;
        }
     var timeIn =  this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number)].timeIn;
     var timeOut =  this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number)].timeOut;
     var hours:any = timeOut.split(':')[0] - timeIn.split(':')[0];
     var minutes:any = timeOut.split(':')[1] - timeIn.split(':')[1];
     if(minutes<0){ 
         hours--;
         minutes = 60 + minutes;
     }
    hours = hours - 0.5;
    if( this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number)].compensationHoliday ) {
      if(!this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number) - 1].absent && !this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number)].absent) {
        hours = hours + 0.5 + 8;
        this.newAttandance[employeeIndex].weeks[weekIndex].compensationHrs = this.newAttandance[employeeIndex].weeks[weekIndex].compensationHrs + 8;
      } else {
        hours = hours + 0.5;
      }
    } else if ( this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number)].holiday ) {
      if((!this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number) - 1].absent || !this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number) +1].absent ) && !this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number)].absent) {
        this.newAttandance[employeeIndex].weeks[weekIndex].holidayHrs = this.newAttandance[employeeIndex].weeks[weekIndex].holidayHrs + 8;
      hours = hours + 0.5 + 8;
      }  else {
        hours = hours + 0.5;
      }
    } else if (  this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number)].weekOff ) {
      if((!this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number) - 1].absent || !this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number) + 1].absent ) && !this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number)].absent) {
        this.newAttandance[employeeIndex].weeks[weekIndex].weekOffHrs = this.newAttandance[employeeIndex].weeks[weekIndex].weekOffHrs + 8;
      hours = hours + 0.5 + 8;  
    }  else {
      hours = hours + 0.5;
    }    
    } else {
           if ( this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number)].absent) {
                 hours = hours + 0.5;
            } else if ( this.newAttandance[employeeIndex].dates[this.getAttandanceArrayIndex(this.weeks[0].dates[j], this.weeks[0].number)].leave ) {
                 hours = hours; 
            }
    }
    if((hours + (minutes/60)) > 8) {
      this.newAttandance[employeeIndex].weeks[weekIndex].otHrs = this.newAttandance[employeeIndex].weeks[weekIndex].otHrs + hours + (minutes/60) - 8;
      this.newAttandance[employeeIndex].weeks[weekIndex].weekHrs = this.newAttandance[employeeIndex].weeks[weekIndex].weekHrs + 8;
    } else {
      this.newAttandance[employeeIndex].weeks[weekIndex].weekHrs = this.newAttandance[employeeIndex].weeks[weekIndex].weekHrs + hours + (minutes/60);
    } 
      }
    }
  }
  submit() {
    this.operations.employeeAttandance(JSON.parse(JSON.stringify(this.newAttandance)), this.months[this.selectedMonth - 1] + '-' + this.selectedYear);
}
}
