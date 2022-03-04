import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { ApplicationI, BookingElementI } from "../interfaces/booking-interfaces";
import { Store } from "@ngxs/store";
import { AddApplicationAction } from "../store/actions.store";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor( private store: Store ) { }

  private mokData$ = of([
    {room: 131, number: 3, price: 1079, start: '', end: '' },
    {room: 201, number: 3, price: 1089, start: '', end: '' },
    {room: 101, number: 3, price: 1099, start: '', end: '' },
    {room: 444, number: 3, price: 1179, start: 'Thu Mar 05 2022 00:00:00 GMT+0300 (Moscow Standard Time)', end: 'Thu Mar 05 2022 00:00:00 GMT+0300 (Moscow Standard Time)' },
    {room: 555, number: 3, price: 1279, start: 'Thu Mar 04 2022 00:00:00 GMT+0300 (Moscow Standard Time)', end: 'Thu Mar 04 2022 00:00:00 GMT+0300 (Moscow Standard Time)' },
    {room: 666, number: 3, price: 1379, start: 'Thu Mar 03 2022 00:00:00 GMT+0300 (Moscow Standard Time)', end: 'Thu Mar 03 2022 00:00:00 GMT+0300 (Moscow Standard Time)' },
    {room: 701, number: 3, price: 1479, start: '', end: '' },
    {room: 801, number: 3, price: 1579, start: '', end: '' },
    {room: 901, number: 3, price: 1679, start: '', end: '' },
    {room: 102, number: 3, price: 1779, start: '', end: '' },
    {room: 112, number: 3, price: 10879, start: '', end: '' },
    {room: 122, number: 3, price: 1859, start: '', end: '' },
    {room: 132, number: 3, price: 1279, start: '', end: '' },
    {room: 142, number: 3, price: 1979, start: '', end: '' },
    {room: 152, number: 3, price: 1079, start: '', end: '' },
    {room: 162, number: 3, price: 1979, start: '', end: '' },
    {room: 172, number: 3, price: 10979, start: '', end: '' },
    {room: 182, number: 3, price: 1079, start: '', end: '' },
    {room: 192, number: 3, price: 1079, start: '', end: '' },
    {room: 202, number: 3, price: 1079, start: '', end: '' },
  ]);

  private applications: ApplicationI[] = [];

  // TODO: implement pagination
  getData(): Observable<BookingElementI[]>{
    return this.mokData$;
  }

  postData(application: ApplicationI): void {
    this.applications.push(application);
    this.store.dispatch(new AddApplicationAction(application))
  }

}
