import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(date: string):SafeHtml {
    
    let currDate:Date = new Date(date);
    let formatDate =  currDate.getUTCFullYear() + "/" +
    ("0" + (currDate.getUTCMonth()+1)).slice(-2) + "/" +
    ("0" + currDate.getUTCDate()).slice(-2) + " " +
    ("0" + currDate.getUTCHours()).slice(-2) + ":" +
    ("0" + currDate.getUTCMinutes()).slice(-2);

    let result = (currDate.getTime() < Date.now()) ? 
    `<div style="color:red">${formatDate}</div>` :
    `<div style="color:green">${formatDate}</div>` 

    return this._sanitizer.bypassSecurityTrustHtml(result);
  }
}
