import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntItemComponent } from './ant-item.component';

describe('AntItemComponent', () => {
  let component: AntItemComponent;
  let fixture: ComponentFixture<AntItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
