import { Injectable } from "@angular/core";
import { AnyFn } from "@ngrx/store/src/selector";
import { ReservationViewModel } from "restaurant-swagger-client";

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
      description : `${dataItem.customer?.customerName} - ${dataItem.customer?.phoneNumber}`,
      customer: dataItem.customer
    }
  };

  public convertFromSchedulerEvent = (dataItem: any) : ReservationViewModel => {
     return {
      startTime: this.parseAdjust(dataItem.start),
      endTime: this.parseAdjust(dataItem.end),
      id: dataItem.id || 0,
      table: {
        tableId: dataItem?.tableId
      },
      customer: {
        customerId: dataItem?.customer?.customerId || 0,
        customerName: dataItem?.customerName || dataItem?.customer?.customerName,
        emailId: dataItem?.customerEmail,
        phoneNumber: dataItem?.customerPhone
      }
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
