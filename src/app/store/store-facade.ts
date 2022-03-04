import { Injectable } from "@angular/core";
import { BookingService } from "../services/booking.service";
import { Store } from "@ngxs/store";
import { GetDataAction } from "./actions.store";
import { Observable, take } from "rxjs";
import { Select } from '@ngxs/store';
import { BookingState } from "./app.state";
import { ApplicationI, BookingElementI } from "../interfaces/booking-interfaces";

@Injectable({
  providedIn: 'root'
})
export class StoreFacade {
  @Select(BookingState.getDataSelector) data$!: Observable<BookingElementI[]>;
  @Select(BookingState.getApplicationsSelector) dataApplications!: ApplicationI[];

  constructor(
    private bookingService: BookingService,
    private store: Store,
  ) {}

  public getInitialState(): void {
   this.bookingService.getData()
     .pipe(take(1))
     .subscribe(data => this.store.dispatch(new GetDataAction(data)));
  }
}
