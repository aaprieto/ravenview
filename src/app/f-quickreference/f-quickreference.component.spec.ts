import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FQuickreferenceComponent } from './f-quickreference.component';

describe('FQuickreferenceComponent', () => {
  let component: FQuickreferenceComponent;
  let fixture: ComponentFixture<FQuickreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FQuickreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FQuickreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
