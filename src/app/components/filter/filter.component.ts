import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { map, Subject, switchMap, takeUntil } from "rxjs";
import { BookingState } from "../../store/app.state";
import { Store } from "@ngxs/store";
import { BookingElementI } from "../../interfaces/booking-interfaces";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit, OnDestroy {

  @Output() filterData: EventEmitter<BookingElementI[]> = new EventEmitter<BookingElementI[]>()

  constructor( private store: Store ) { }

  public filterDate = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.filterDate.valueChanges
      .pipe(
        switchMap((search) => {
          return this.store.select(BookingState.getDataSelector)
            .pipe(
              map(data => {
                return data.filter(item => {
                  return +item.start < +search.start && +item.end < +search.start || +item.start > +search.end && +item.end > +search.end;
                })
              })
            )
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(data => this.filterData.emit(data));
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
