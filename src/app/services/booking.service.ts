import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {ApplicationI, BookingElement} from "../interfaces/booking-interfaces";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private mokData$ = of([
    {room: 131, number: 3, price: 1079},
    {room: 201, number: 3, price: 1089},
    {room: 101, number: 3, price: 1099},
    {room: 401, number: 3, price: 1179},
    {room: 501, number: 3, price: 1279},
    {room: 601, number: 3, price: 1379},
    {room: 701, number: 3, price: 1479},
    {room: 801, number: 3, price: 1579},
    {room: 901, number: 3, price: 1679},
    {room: 102, number: 3, price: 1779},
    {room: 112, number: 3, price: 10879},
    {room: 122, number: 3, price: 1859},
    {room: 132, number: 3, price: 1279},
    {room: 142, number: 3, price: 1979},
    {room: 152, number: 3, price: 1079},
    {room: 162, number: 3, price: 1979},
    {room: 172, number: 3, price: 10979},
    {room: 182, number: 3, price: 1079},
    {room: 192, number: 3, price: 1079},
    {room: 202, number: 3, price: 1079},
  ]);
  private applications: ApplicationI[] = [];

  // TODO: implement pagination
  getData(): Observable<BookingElement[]>{
    return this.mokData$;
  }

  postData(application: ApplicationI) {
    this.applications.push(application);
  }

}
