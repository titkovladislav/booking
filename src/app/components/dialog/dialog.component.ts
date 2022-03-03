import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup } from "@angular/forms";


// TODO: use onPush

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public application = new FormGroup({
    surname: new FormControl(),
    name: new FormControl(),
    patronymic: new FormControl(),
    start: new FormControl(),
    end: new FormControl(),
  })

  public onCloseClick(): void {
    this.dialogRef.close()
  };

  public createApplication():void {
    const application = this.application.value
    console.log(application)
  };

}
