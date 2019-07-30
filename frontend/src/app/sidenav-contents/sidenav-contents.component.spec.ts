import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavContentsComponent } from './sidenav-contents.component';

describe('SidenavContentsComponent', () => {
  let component: SidenavContentsComponent;
  let fixture: ComponentFixture<SidenavContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
