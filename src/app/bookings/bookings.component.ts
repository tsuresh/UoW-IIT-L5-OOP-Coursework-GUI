import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PopupAlertDialog } from '../reserve/reserve.component';

let bookings: any = [];

export interface PeriodicElement {
  bookingId: string;
  fullName: string;
  contactNumber: string;
  dateFrom: string;
  dateTo: string
}

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {

  plateNumber: string;
  displayedColumns: string[] = ['bookingId', 'fullName', 'contactNumber', 'dateFrom', 'dateTo', 'action'];
  dataSource: PeriodicElement[] = [];

  constructor(private httpService: HttpClient, private route: ActivatedRoute, private dialog: MatDialog) { }

  deleteBooking(bookingId: string) {
    this.httpService.delete(`http://localhost:8080/api/v1/bookings/${this.plateNumber}/${bookingId}`).subscribe(data => {
      let jsonStr = JSON.stringify(data);
      let jsonData = JSON.parse(jsonStr);
      this.openDialog("Delete booking", jsonData.detail);
      this.ngOnInit();
    });
  }

  ngOnInit() {

    this.plateNumber = this.route.snapshot.paramMap.get("plateNumber") || "";
    console.log(this.plateNumber);

    this.httpService.get(`http://localhost:8080/api/v1/bookings/${this.plateNumber}`).subscribe(
      data => {
        //this.dataSource = data as PeriodicElement[];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
        let jsonStr = JSON.stringify(data);
        let jsonData = JSON.parse(jsonStr);
        bookings = jsonData.map(booking => {
          return {
            bookingId: booking.bookingId,
            fullName: booking.fullName,
            contactNumber: booking.contactNumber,
            dateFrom: new DatePipe('en').transform(booking.dateFrom, 'dd/MM/yyyy') || "",
            dateTo: new DatePipe('en').transform(booking.dateTo, 'dd/MM/yyyy') || ""
          };
        });
        this.dataSource = bookings;
        console.log(bookings);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
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