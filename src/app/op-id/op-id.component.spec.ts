import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OPIDComponent } from './op-id.component';

describe('OPIDComponent', () => {
  let component: OPIDComponent;
  let fixture: ComponentFixture<OPIDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OPIDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OPIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
