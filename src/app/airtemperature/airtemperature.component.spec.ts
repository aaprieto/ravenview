import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirtemperatureComponent } from './airtemperature.component';

describe('AirtemperatureComponent', () => {
  let component: AirtemperatureComponent;
  let fixture: ComponentFixture<AirtemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirtemperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirtemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
