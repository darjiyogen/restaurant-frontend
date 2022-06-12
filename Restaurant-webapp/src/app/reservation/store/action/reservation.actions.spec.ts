import * as fromReservation from './reservation.actions';

describe('loadReservations', () => {
  it('should return an action', () => {
    expect(fromReservation.loadReservations().type).toBe('[Reservation] Load Reservations');
  });
});
