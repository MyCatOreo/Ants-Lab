import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodWikiItemComponent } from './food-wiki-item.component';

describe('FoodWikiItemComponent', () => {
  let component: FoodWikiItemComponent;
  let fixture: ComponentFixture<FoodWikiItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodWikiItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodWikiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
