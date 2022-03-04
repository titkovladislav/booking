import { Component } from '@angular/core';
import { Store } from "@ngxs/store";
import { BookingState } from "../../../store/app.state";
import { ApplicationI } from "../../../interfaces/booking-interfaces";
import { MatTableDataSource } from "@angular/material/table";
import { tap } from "rxjs";

@Component({
  selector: 'app-table-result',
  templateUrl: './table-result.component.html',
  styleUrls: ['./table-result.component.sass']
})
export class TableResultComponent {

  public displayedColumns: string[] = ['room', 'surname', 'name', 'start', 'end'];
  public dataSource!: MatTableDataSource<ApplicationI>;
  public dataApplications$ = this.store.select(BookingState.getApplicationsSelector)
    .pipe(
      tap((data) => {
        this.dataSource = new MatTableDataSource<ApplicationI>(data);
      }),
    );

  constructor(private store: Store) {}
}
