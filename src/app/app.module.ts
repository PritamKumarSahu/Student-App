import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

/**
 * Third party module imports
 */
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxChartsModule } from '@swimlane/ngx-charts';


/**
 * components 
 */
import { ChartComponent } from './chart/chart.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentService } from './services/student.service'

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxChartsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
