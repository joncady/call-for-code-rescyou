import { Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList, AfterContentInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { paginateArray } from 'src/app/util/paginate';
import { UserInfo } from '../../userInfo';
import { UserAdminService } from '../../user-admin.service';
import { map } from 'rxjs/operators';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { PhoneNumberPipe } from 'src/app/pipes/phone-number.pipe';
import { MatTable, MatTableDataSource } from '@angular/material/table';

class FilteredUserInfo {
  name: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-blood-type-search-table',
  templateUrl: './blood-type-search-table.component.html',
  styleUrls: ['./blood-type-search-table.component.scss']
})
export class BloodTypeSearchTableComponent implements OnInit, AfterViewInit {
  @Input()
  title: string;
  @Input()
  filter: (user: UserInfo) => boolean;
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;
  /*
  @ViewChildren('dataTable')
  tables: QueryList<MatTable<any>>;
  */
  dataSource: MatTableDataSource<UserInfo>;
  displayedColumns = ['name', 'phoneNumber'];
  users: Array<Array<FilteredUserInfo>>;
  pageEvent: PageEvent;
  length: number;
  pageLength = 25;
  pageLengthOptions = [25];
  bloodTypes = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
  selectedBloodType = 'O-';
  constructor(private userAdminService: UserAdminService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    /*
    this.tables.changes.subscribe((results: QueryList<MatTable<any>>) => {
      this.table = results.first;
      this.getUsersForSelectedType();
    });
    */
    this.getUsersForSelectedType();
  }

  getUsersForSelectedType() {
    /*
    this.userAdminService.getUsersByBloodtype(this.selectedBloodType).pipe(
      map(arr => {
        const filteredArray = arr.filter(this.filter).map(userInfo => ({
          name: userInfo.user.first_name + ' ' + userInfo.user.last_name,
          phoneNumber: new PhoneNumberPipe().transform(userInfo.phone_number)
        }));
        this.length = filteredArray.length;
        return paginateArray(filteredArray, this.pageLength);
      })
    ).subscribe(userPages => {
      this.users = userPages;
      this.changeDetector.detectChanges();
      this.dataTable.renderRows();
    });
    */
    this.userAdminService.getUsersByBloodtype(this.selectedBloodType).pipe(
      map(arr => {
        const filteredArray = arr.filter(this.filter);
        this.length = filteredArray.length;
        return filteredArray;
      })
    ).subscribe((users: UserInfo[]) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.changeDetector.detectChanges();
    });
  }
/*
  onPageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.changeDetector.detectChanges();
    this.dataTable.renderRows();
  }
  */
}
