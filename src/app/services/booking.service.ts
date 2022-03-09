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
    {room: 131, number: 3, price: 1079, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 201, number: 3, price: 1089, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 101, number: 3, price: 1099, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 444, number: 3, price: 1179, start: new Date(1646427600000), end: new Date(1646427600000) },
    {room: 555, number: 3, price: 1279, start: new Date(1646341200000), end: new Date(1646341200000) },
    {room: 666, number: 3, price: 1379, start: new Date(1646254800000), end: new Date(1646254800000) },
    {room: 701, number: 3, price: 1479, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 801, number: 3, price: 1579, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 901, number: 3, price: 1679, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 102, number: 3, price: 1779, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 112, number: 3, price: 10879, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 122, number: 3, price: 1859, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 132, number: 3, price: 1279, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 142, number: 3, price: 1979, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 152, number: 3, price: 1079, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 162, number: 3, price: 1979, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 172, number: 3, price: 10979, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 182, number: 3, price: 1079, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 192, number: 3, price: 1079, start: new Date(1000000000000), end: new Date(1000000000000) },
    {room: 202, number: 3, price: 1079, start: new Date(1000000000000), end: new Date(1000000000000) },
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
