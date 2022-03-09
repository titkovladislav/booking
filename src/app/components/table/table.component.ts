import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BookingElementI } from "../../interfaces/booking-interfaces";
import { MatDialog } from "@angular/material/dialog";
import { Subject, tap } from "rxjs";
import { DialogComponent } from "../dialog/dialog.component";
import { StoreFacade } from "../../store/store-facade";
import { Store } from "@ngxs/store";
import { BookingState } from "../../store/app.state";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public dialog: MatDialog,
    private storeFacade: StoreFacade,
    private store: Store
  ) {}

  public displayedColumns: string[] = ['room', 'number', 'price'];
  public dataSource!: MatTableDataSource<BookingElementI>;
  public bookingData$ = this.store.select(BookingState.getDataSelector)
    .pipe(
      tap((data) => this.dataSource = new MatTableDataSource<BookingElementI>(data))
    );
  private unsubscribe$: Subject<void> = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public openBookingDialog(room: BookingElementI):void {
    this.dialog.open(DialogComponent, {
        width: '350px',
        data: { ...room },
      }
    );
  }

  public applyFilter(filterData: BookingElementI[]): void {
    this.dataSource.data = filterData;
  }

  ngOnInit() {
    this.storeFacade.getInitialState();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
