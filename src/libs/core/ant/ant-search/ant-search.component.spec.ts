import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntSearchComponent } from './ant-search.component';

describe('AntSearchComponent', () => {
  let component: AntSearchComponent;
  let fixture: ComponentFixture<AntSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
