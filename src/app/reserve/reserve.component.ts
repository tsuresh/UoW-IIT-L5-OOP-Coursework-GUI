import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})

export class ReserveComponent implements OnInit {

  constructor(private httpService: HttpClient, private route: ActivatedRoute, private dialog: MatDialog) { }

  plateNumber: string;

  ngOnInit() {
    this.plateNumber = this.route.snapshot.paramMap.get("plateNumber") || "";
    console.log(this.plateNumber);
  }

  makeReservation(form) {
    console.log("Make reservation");
    const body = {
      plateNumber: this.plateNumber || "",
      dateFrom: new DatePipe('en').transform(form.value.pickupDate, 'dd/MM/yyyy') || "",
      dateTo: new DatePipe('en').transform(form.value.dropoffDate, 'dd/MM/yyyy') || "",
      fullName: form.value.fullName || "",
      contactNumber: form.value.contact || "",
      address: form.value.address || ""
    };
    this.httpService.post('http://localhost:8080/api/v1/bookings', body).subscribe(
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
    const body = {
      plateNumber: this.plateNumber || "",
      dateFrom: new DatePipe('en').transform(form.value.pickupDate, 'dd/MM/yyyy') || "",
      dateTo: new DatePipe('en').transform(form.value.dropoffDate, 'dd/MM/yyyy') || ""
    };
    this.httpService.post('http://localhost:8080/api/v1/bookings/isBooked', body).subscribe(
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
  styleUrls: ['./alert-dialog.css']
})

export class PopupAlertDialog {
  constructor(
    public dialogRef: MatDialogRef<PopupAlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}