import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiItemComponent } from './wiki-item.component';

describe('WikiItemComponent', () => {
  let component: WikiItemComponent;
  let fixture: ComponentFixture<WikiItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
