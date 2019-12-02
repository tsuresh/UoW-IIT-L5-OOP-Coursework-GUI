import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  displayedColumns: string[] = ['plateNumber', 'make', 'model', 'dayRental', 'type', 'action'];
  dataSource: PeriodicElement[] = [];

  constructor(private httpService: HttpClient) { }

  search(form) {
    const query = form.value.query.toLowerCase();
    const searchType = form.value.searchType;
    let filteredArray = [];

    if (query != "" && searchType != "") {
      filteredArray = [];
      if (searchType === "plate") {
        filteredArray.push(vehicles.find(vehicle => vehicle.plateNumber === query));
      } else if (searchType == "model") {
        vehicles.forEach(vehicle => {
          if (vehicle.model.toLowerCase() === query) {
            filteredArray.push(vehicle);
          }
        });
      } else if (searchType === "make") {
        vehicles.forEach(vehicle => {
          if (vehicle.make.toLowerCase() === query) {
            filteredArray.push(vehicle);
          }
        });
      } else if (searchType === "rental") {
        vehicles.forEach(vehicle => {
          if (vehicle.dayRental === query + " " + currency) {
            filteredArray.push(vehicle);
          }
        });
      } else if (searchType === "type") {
        vehicles.forEach(vehicle => {
          if (vehicle.type.toLowerCase() === query) {
            filteredArray.push(vehicle);
          }
        });
      }
    }
    console.log("Search result count: " + filteredArray.length);
    this.dataSource = filteredArray;
  }

  clearSearch(form) {
    form.controls["query"].setValue("");
    form.controls["searchType"].setValue("plate");
    this.dataSource = vehicles;
  }

  ngOnInit() {
    this.httpService.get('http://localhost:8080/api/v1/vehicles').subscribe(
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