import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntTableComponent } from './ant-table.component';

describe('AntTableComponent', () => {
  let component: AntTableComponent;
  let fixture: ComponentFixture<AntTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
