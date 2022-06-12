import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ReservationEffects } from './reservation.effects';

describe('ReservationEffects', () => {
  let actions$: Observable<any>;
  let effects: ReservationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReservationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ReservationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
