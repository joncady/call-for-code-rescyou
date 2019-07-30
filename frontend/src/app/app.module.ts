import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule, MatTree } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CookieService } from 'ngx-cookie-service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ScoreChipComponent } from './score-chip/score-chip.component';
import { RedGreenScaleDirective } from './score-chip/red-green-scale.directive';
import { RiskDetailsComponent } from './risk-details/risk-details.component';
import { BeforePhotoUploadComponent } from './damage-evaluation/before-photo-upload/before-photo-upload.component';
import { DamageEvaluationComponent } from './damage-evaluation/damage-evaluation.component';
import { UploadBoxComponent } from './damage-evaluation/upload-box/upload-box.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmergencyContactsComponent } from './emergency-contacts/emergency-contacts.component';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { MapComponent } from './risk-details/map/map.component';
import { EmergencyContactsEditComponent } from './emergency-contacts-edit/emergency-contacts-edit.component';
import { SidenavContentsComponent } from './sidenav-contents/sidenav-contents.component';
import { AfterPhotoUploadComponent } from './damage-evaluation/after-photo-upload/after-photo-upload.component';
import { MultiUploadBoxComponent } from './damage-evaluation/multi-upload-box/multi-upload-box.component';
import { BidsComponent } from './bids/bids.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobSummaryComponent } from './jobs/job-summary/job-summary.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { BidDialogComponent } from './jobs/job-detail/bid-dialog/bid-dialog.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BloodTypeSearchTableComponent } from './admin/admin-dashboard/blood-type-search-table/blood-type-search-table.component';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ToolbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ScoreChipComponent,
    RedGreenScaleDirective,
    RiskDetailsComponent,
    BeforePhotoUploadComponent,
    DamageEvaluationComponent,
    UploadBoxComponent,
    EmergencyContactsComponent,
    PhoneNumberPipe,
    MapComponent,
    EmergencyContactsEditComponent,
    SidenavContentsComponent,
    AfterPhotoUploadComponent,
    MultiUploadBoxComponent,
    BidsComponent,
    JobsComponent,
    JobSummaryComponent,
    JobDetailComponent,
    BidDialogComponent,
    AdminDashboardComponent,
    BloodTypeSearchTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    MatTreeModule,
    ReactiveFormsModule,
    LeafletModule
  ],
  entryComponents: [
    BidDialogComponent
  ],
  providers: [
    CookieService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
