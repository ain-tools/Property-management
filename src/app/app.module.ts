import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DataService } from './data.service';
import { RentalsComponent } from './rentals/rentals.component';
import { TenantsComponent } from './tenants/tenants.component';
import { IncomeComponent } from './income/income.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { SupportComponent } from './support/support.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RentalsComponent,
    TenantsComponent,
    IncomeComponent,
    MaintenanceComponent,
    ComplaintsComponent,
    SupportComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
