import { Component, OnInit } from '@angular/core';
import { UserAdminService } from '../user-admin.service';
import { UserInfo } from '../userInfo';
import { Observable } from 'rxjs';
import { paginateArray } from 'src/app/util/paginate';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  bloodDonorFilter = (user: UserInfo): boolean => user.medical_info.blood_donor;
  organDonorFilter = (user: UserInfo): boolean => user.medical_info.organ_donor;

  constructor() { }

  ngOnInit() {
  }

  getUsersForSelectedType() {

  }
}
