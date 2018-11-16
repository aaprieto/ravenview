import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoiltemperatureComponent } from './soiltemperature.component';

describe('SoiltemperatureComponent', () => {
  let component: SoiltemperatureComponent;
  let fixture: ComponentFixture<SoiltemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoiltemperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoiltemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
