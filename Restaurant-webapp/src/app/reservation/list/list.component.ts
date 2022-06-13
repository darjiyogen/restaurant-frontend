import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Reservation } from 'src/app/models/reservation';
import { ReservationState } from '../store/reducer/reservation.reducer';
import {
  selectReservations,
  selectTable,
} from '../store/selector/reservation.selectors';
import * as reservationActions from '../store/action/reservation.actions';
import { EditMode, SlotRange } from '@progress/kendo-angular-scheduler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditService } from 'src/app/services/EditService';
import { HelperService } from 'src/app/services/HelperService';
import { RestaurantTableViewModel } from 'restaurant-swagger-client';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit{
  public tables!: RestaurantTableViewModel[];
  public reservation!: Reservation[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  public selectedDate: Date = new Date();
  public selection: SlotRange = {
    start: new Date(new Date().setHours(0, 0, 0, 0)),
    end: new Date(new Date().setHours(23, 30, 0, 0)),
  };

  public group: any = {
    resources: [],
    orientation: 'vertical',
  };

  public resources: any[] = [];
  public formGroup: FormGroup | undefined;

  public seatData: Array<{ text: string; value: number }> = [
    { text: '2+', value: 2 },
    { text: '3+', value: 3 },
    { text: '4+', value: 4 },
    { text: '5+', value: 5 },
    { text: '6+', value: 6 },
    { text: '7+', value: 7 },
    { text: '8+', value: 8 },
  ];
  public filterSeat!: Number;

  public filterStart!: Date;
  public filterEnd!: Date;

  constructor(
    private store: Store<ReservationState>,
    private formBuilder: FormBuilder,
    public editService: EditService,
    private helperService: HelperService,
    private cdr: ChangeDetectorRef
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);

    this.selectTables();
    this.store.dispatch(reservationActions.GetTable());
  }

  ngOnInit(): void {
    // Bind to reservation selection
    this.selectReservation();
  }

  selectReservation() {
    this.store
      .select(selectReservations)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        const clonedData = JSON.parse(JSON.stringify(res));
        this.reservation = clonedData.map((x: any) => {
          return {
            ...x,
            start: this.helperService.parseAdjust(x.start),
            end: this.helperService.parseAdjust(x.end),
          };
        });

        this.cdr.detectChanges();
      });
  }

  selectTables() {
    this.store
      .select(selectTable)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.tables = res;
        this.setTable(res);
        this.loadReservations();
      });
  }

  // Load reservation with filters
  loadReservations() {
    var query = {} as any;
    if (this.filterSeat) {
      query.seat = this.filterSeat;
    }
    if (this.filterStart) {
      query.start = this.helperService.parseAdjust(this.filterStart);
    }
    if (this.filterEnd) {
      query.end = this.helperService.parseAdjust(this.filterEnd);
    }

    query =  JSON.parse(JSON.stringify(query));

    // Dispatch action to get filter reservation
    this.store.dispatch(reservationActions.GetReservation({ query }));
  }

  // Helper function to set Table name column
  setTable(tables: any[]) {
    if (!tables.length) {
      return;
    }
    let resTable: any[] = [];
    this.group.resources = ['Table'];

    // Set text as Name Location No of Seats
    tables.map((table: any) => {
      resTable.push({
        text: `${table.name} (${table.location}) - ${table.seats}`,
        value: table.tableId.toString(),
        color: this.helperService.generateRandomColor(),
      });
    });

    this.resources = [
      {
        name: 'Table',
        data: resTable,
        field: 'tableId',
        valueField: 'value',
        textField: 'text',
        colorField: 'color',
      },
    ];
  }

  // Helper function to create add/edit form
  public createFormGroup(args: any): FormGroup {
    const dataItem = { ...args.dataItem };

    this.formGroup = this.formBuilder.group({
      start: dataItem.start,
      end: dataItem.end,

      title: dataItem.title,
      id: dataItem.id,
      tableId: dataItem?.tableId,
      location: dataItem?.location,
      table: dataItem?.table,
      isAllDay: false,
      description: dataItem.description,
      seats: dataItem.seats,
      customerName: dataItem.customerName,
      customerEmail: dataItem.customerEmail,
      customerPhone: dataItem.customerPhone
    });

    return this.formGroup;
  }

  // On Seat filter change
  onSeatFilterChange(evt: any) {
    this.loadReservations();
  }

  // On Start and End time filter change
  onTimeFilterChange() {
    this.loadReservations();
  }
}
