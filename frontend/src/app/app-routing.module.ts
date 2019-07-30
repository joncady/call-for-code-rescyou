import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { BeforePhotoUploadComponent } from './damage-evaluation/before-photo-upload/before-photo-upload.component';
import { DamageEvaluationComponent } from './damage-evaluation/damage-evaluation.component';
import { RiskDetailsComponent } from './risk-details/risk-details.component';
import { EmergencyContactsComponent } from './emergency-contacts/emergency-contacts.component';
import { MapComponent } from './risk-details/map/map.component';
import { EmergencyContactsEditComponent } from './emergency-contacts-edit/emergency-contacts-edit.component';
import { AfterPhotoUploadComponent } from './damage-evaluation/after-photo-upload/after-photo-upload.component';
import { AuthGuard } from './user/auth.guard';
import { LoggedOutGuard } from './user/logged-out.guard';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminDashboardComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'login',
    canActivate: [LoggedOutGuard],
    component: LoginComponent
  },
  {
    path: 'signup',
    canActivate: [LoggedOutGuard],
    component: SignupComponent
  },
  {
    path: 'contacts',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'edit',
            component: EmergencyContactsEditComponent
          },
          {
            path: '',
            component: EmergencyContactsComponent
          }
        ]
      }
    ]
  },
  {
    path: 'risk-breakdown',
    canActivate: [AuthGuard],
    component: RiskDetailsComponent
  },
  {
    path: 'damage-eval',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'before-upload',
            component: BeforePhotoUploadComponent
          },
          {
            path: 'after-upload',
            component: AfterPhotoUploadComponent
          },
          {
            path: '',
            component: DamageEvaluationComponent
          }
        ]
      }
    ]
  },
  {
    path: 'contractors',
    children: [
      {
        path: '',
        children: [
          {
            path: 'available-jobs',
            component: JobsComponent
          },
          {
            path: 'job/:id',
            component: JobDetailComponent
          },
          {
            path: '',
            redirectTo: 'available-jobs',
            pathMatch: 'full'
          }
        ]
      }
    ]
  },
  {
    path: '',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
