import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

const currency: string = "LKR";
let vehicles: any = [];

export interface PeriodicElement {
  plateNumber: string;
  make: string;
  model: string;
  dayRental: string;
  type: string
}

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent {

  displayedColumns: string[] = ['plateNumber', 'make', 'model', 'dayRental', 'type', 'action'];
  dataSource: PeriodicElement[] = [];

  constructor(private httpService: HttpClient) { }

  ngOnInit() {
  }

  clearSearch(form) {
    form.controls["pickupDate"].setValue("");
    form.controls["dropoffDate"].setValue("plate");
    this.dataSource = [];
  }

  search(form) {
    const pickupDate = new DatePipe('en').transform(form.value.pickupDate, 'dd/MM/yyyy') || "";
    const dropDate = new DatePipe('en').transform(form.value.dropoffDate, 'dd/MM/yyyy') || "";

    const reqBody = {
      dateFrom: pickupDate,
      dateTo: dropDate
    };

    this.httpService.post('http://localhost:8080/api/v1/vehicles/available', reqBody).subscribe(
      data => {
        //this.dataSource = data as PeriodicElement[];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
        let jsonStr = JSON.stringify(data);
        let jsonData = JSON.parse(jsonStr);
        vehicles = jsonData.map(vehicle => {
          return {
            plateNumber: vehicle.plateNo,
            make: vehicle.make,
            model: vehicle.model,
            dayRental: vehicle.dayRental + " " + currency,
            type: vehicle.type
          };
        });
        this.dataSource = vehicles;
        console.log(vehicles);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

}
