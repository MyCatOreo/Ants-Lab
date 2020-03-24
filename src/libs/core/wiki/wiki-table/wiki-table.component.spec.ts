import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiTableComponent } from './wiki-table.component';

describe('WikiTableComponent', () => {
  let component: WikiTableComponent;
  let fixture: ComponentFixture<WikiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
