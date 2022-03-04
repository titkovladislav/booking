import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BookingElementI } from "../../interfaces/booking-interfaces";
import { BookingService } from "../../services/booking.service";
import { MatDialog } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { DialogComponent } from "../dialog/dialog.component";
import { StoreFacade } from "../../store/store-facade";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public dialog: MatDialog,
    private mokApi: BookingService,
    private storeFacade: StoreFacade,
  ) {}

  private unsubscribe$: Subject<void> = new Subject<void>();
  private bookingData: BookingElementI[] = [];
  public displayedColumns: string[] = ['room', 'number', 'price'];
  public dataSource = new MatTableDataSource<BookingElementI>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.storeFacade.data$.subscribe(a => console.log('data$', a));
    this.storeFacade.getInitialState();
    this.mokApi.getData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => this.bookingData = value);

    this.dataSource = new MatTableDataSource<BookingElementI>(this.bookingData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public openBookingDialog(room: any):void {
    this.dialog.open(DialogComponent, {
        width: '350px',
        data: { ...room },
      }
    );
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    //
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
