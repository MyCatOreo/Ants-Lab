import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskWikiTableComponent } from './task-wiki-table.component';

describe('TaskWikiTableComponent', () => {
  let component: TaskWikiTableComponent;
  let fixture: ComponentFixture<TaskWikiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskWikiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskWikiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
