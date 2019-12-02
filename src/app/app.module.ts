import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatTableModule, MatCardModule, MatInputModule, MatSelectModule, MatNativeDateModule, MatDatepickerModule, MatDialogModule } from '@angular/material';

import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents, entryComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UpdatebookingComponent } from './updatebooking/updatebooking.component';
import { UpdateBookingComponent } from './update-booking/update-booking.component';
import { AvailableComponent } from './available/available.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UpdatebookingComponent,
    UpdateBookingComponent,
    AvailableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: entryComponents
})
export class AppModule { }