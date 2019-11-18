import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})

export class ReserveComponent implements OnInit {

  plateNumber: string;

  constructor(private httpService: HttpClient, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.plateNumber = this.route.snapshot.paramMap.get("plateNumber") || "";
    console.log(this.plateNumber);
  }

  makeReservation(form) {
    console.log("Make reservation");
    console.log(form.value);

    const body = {
      dateFrom: form.value.pickupDate || "",
      dateTo: form.value.dropoffDate || "",
      fullName: form.value.fullName || "",
      contactNumber: form.value.contact || "",
      address: form.value.address || ""
    };

    this.httpService.post(`http://localhost:3000/bookings/${this.plateNumber}`, body).subscribe(
      data => {
        let jsonStr = JSON.stringify(data);
        let jsonData = JSON.parse(jsonStr);
        console.log(jsonData);
        this.openDialog(jsonData.message, jsonData.detail);
        form.reset();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        this.openDialog(err.error.message, err.error.detail);
      }
    );
  }

  checkAvailability(form) {
    console.log("Check availability");
    console.log(form.value);

    const body = {
      dateFrom: form.value.pickupDate || "",
      dateTo: form.value.dropoffDate || ""
    };

    this.httpService.post(`http://localhost:3000/bookings/${this.plateNumber}/isBooked`, body).subscribe(
      data => {
        let jsonStr = JSON.stringify(data);
        let jsonData = JSON.parse(jsonStr);
        console.log(jsonData);
        this.openDialog(jsonData.message, jsonData.detail);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        this.openDialog(err.error.message, err.error.detail);
      }
    );
  }

  openDialog(message, description): void {
    const dialogRef = this.dialog.open(PopupAlertDialog, {
      width: '350px',
      data: { message: message, description: description }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

export interface DialogData {
  message: string;
  description: string;
}

@Component({
  selector: 'alert-dialog',
  templateUrl: 'alert-dialog.html',
})

export class PopupAlertDialog {
  constructor(
    public dialogRef: MatDialogRef<PopupAlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}