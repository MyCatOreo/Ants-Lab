import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntPageComponent } from './ant-page.component';

describe('AntPageComponent', () => {
  let component: AntPageComponent;
  let fixture: ComponentFixture<AntPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
