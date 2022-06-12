export * from './reservation.service';
import { ReservationService } from './reservation.service';
export * from './table.service';
import { TableService } from './table.service';
export const APIS = [ReservationService, TableService];
