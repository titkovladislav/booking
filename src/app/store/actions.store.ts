import { ApplicationI, BookingElementI } from "../interfaces/booking-interfaces";

export class GetDataAction {
  static readonly type = 'add mok Data';

  constructor( public mokData: BookingElementI[] ) {}
}

export class AddApplicationAction {
  static readonly type = 'add Application'

  constructor(public application: ApplicationI) {}
}
