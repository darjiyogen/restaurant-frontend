import { Injectable } from "@angular/core";
import { AnyFn } from "@ngrx/store/src/selector";

@Injectable()
export class HelperService{
  public loading = false;
  public currentYear = new Date().getFullYear();

  constructor() {

  }

  public parseAdjust = (eventDate: any): Date => {
    const date = new Date(eventDate);
    date.setFullYear(this.currentYear);
    return date;
  };
  
  public convertToSchedulerEvent = (dataItem: any) => {
    return {
      start: this.parseAdjust(dataItem.startTime),
      end: this.parseAdjust(dataItem.endTime),
      startTimezone: "Etc/UTC",
      endTimezone: "Etc/UTC",
      title : dataItem.customer?.customerName,
      id: dataItem.id,
      tableId: dataItem?.table?.tableId?.toString(),
      location: dataItem?.table?.location,
      table: dataItem?.table,
      isAllDay: false,
      description : `${dataItem.customer?.customerName} - ${dataItem.customer?.phoneNumber}`
    }
  };

  public groupBy = (array: any[], key: any) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      console.log(result);
      return result;
    }, {});
  };

  public generateRandomColor = () => {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    let randomNumberStr = randomNumber.toString(16);
    let randColor = randomNumberStr.padStart(6, '0');   
    return `#${randColor.toUpperCase()}`
}
  
}
