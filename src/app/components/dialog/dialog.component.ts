import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup } from "@angular/forms";
import { BookingService } from "../../services/booking.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent {

  constructor(
    private mokApi: BookingService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public applicationForm = new FormGroup({
    surname: new FormControl(),
    name: new FormControl(),
    start: new FormControl(),
    end: new FormControl(),
  })

  public onCloseClick(): void {
    this.dialogRef.close()
  };

  public createApplication(room: string):void {
    this.mokApi.postData({...this.applicationForm.value, room})
  };

}
