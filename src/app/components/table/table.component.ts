import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BookingElement} from "../../interfaces/booking-interfaces";
import {BookingService} from "../../services/booking.service";
import {MatDialog} from "@angular/material/dialog";
import {Subject, takeUntil} from "rxjs";
import {DialogComponent} from "../dialog/dialog.component";

// TODO: use onPush
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public dialog: MatDialog,
    private mokApi: BookingService
  ) {}

  private unsubscribe$: Subject<void> = new Subject<void>();
  // TODO: rename
  private elementData: BookingElement[] = [];
  public displayedColumns: string[] = ['room', 'number', 'price'];
  public dataSource = new MatTableDataSource<BookingElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.mokApi.getData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => this.elementData = value);

    this.dataSource = new MatTableDataSource<BookingElement>(this.elementData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openBookingDialog(room: any):void {
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
