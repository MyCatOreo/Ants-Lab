import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskWikiItemComponent } from './task-wiki-item.component';

describe('TaskWikiItemComponent', () => {
  let component: TaskWikiItemComponent;
  let fixture: ComponentFixture<TaskWikiItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskWikiItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskWikiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
