import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IUserlistComponent } from './i-userlist.component';

describe('IUserlistComponent', () => {
  let component: IUserlistComponent;
  let fixture: ComponentFixture<IUserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IUserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
