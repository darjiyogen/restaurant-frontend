import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Reservation } from 'src/app/models/reservation';
import { ReservationState } from '../store/reducer/reservation.reducer';
import { selectReservations } from '../store/selector/reservation.selectors';
import * as reservationActions from '../store/action/reservation.actions';
import { EditMode, SlotRange } from '@progress/kendo-angular-scheduler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditService } from 'src/app/services/EditService';
import { HelperService } from 'src/app/services/HelperService';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  public reservation!: Reservation[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  public selectedDate: Date = new Date();
  public selection: SlotRange = {
    start: new Date(new Date().setHours(0, 0, 0, 0)),
    end: new Date(new Date().setHours(23, 30, 0, 0)),
    isAllDay: true,
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

  public filterStart!: Date;
  public filterEnd! : Date ;

  constructor(
    private store: Store<ReservationState>,
    private formBuilder: FormBuilder,
    public editService: EditService,
    private helperService: HelperService
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
    this.store
      .select(selectReservations)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.length) {
          this.setResoueces(data);
          const clonedData = JSON.parse(JSON.stringify(data));
          this.reservation = clonedData.map((x: any) => {
            return {
              ...x,
              start: this.helperService.parseAdjust(x.start),
              end: this.helperService.parseAdjust(x.end),
            };
          });
        }
      });
    this.store.dispatch(reservationActions.GetReservation());
  }

  setResoueces(reservations: any[]) {
    let resTable: any[] = [];

    const groupTable: any[] = this.helperService.groupBy(reservations, 'tableId');

    Object.keys(groupTable).map((key: any) => {
      const location = groupTable[key][0].location;
      resTable.push({
        text: `Table ${key} (${location})`,
        value: key,
        color: this.helperService.generateRandomColor(),
      });
    });

    this.group.resources = ['Table'];

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

  ngOnInit(): void {}

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
    });

    return this.formGroup;
  }

  onSeatFilterChange(evt: any) {
    console.log(evt);
  }
}
