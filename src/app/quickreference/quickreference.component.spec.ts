import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickreferenceComponent } from './quickreference.component';

describe('QuickreferenceComponent', () => {
  let component: QuickreferenceComponent;
  let fixture: ComponentFixture<QuickreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
