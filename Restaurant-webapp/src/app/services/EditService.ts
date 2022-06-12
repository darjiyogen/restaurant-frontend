import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { parseDate } from "@progress/kendo-angular-intl";
import { BaseEditService, SchedulerModelFields } from "@progress/kendo-angular-scheduler";
import { zip, Observable, map, tap } from "rxjs";
import { Reservation } from "../models/reservation";

const fields: SchedulerModelFields = {
    id: "TaskID",
    title: "Title",
    description: "Description",
    startTimezone: "StartTimezone",
    start: "Start",
    end: "End",
    endTimezone: "EndTimezone",
  };

@Injectable()
export class EditService extends BaseEditService<Reservation> {
  public loading = false;

  constructor(private http: HttpClient) {
    super(fields);
  }

  public read(): void {
    if (this.data.length) {
      this.source.next(this.data);
      return;
    }
  }

  protected save(
    created: Reservation[],
    updated: Reservation[],
    deleted: Reservation[]
  ): void {
    const completed = [];
    if (deleted.length) {
    
    }

    if (updated.length) {
    
    }

    if (created.length) {
     
    }
  }
}
