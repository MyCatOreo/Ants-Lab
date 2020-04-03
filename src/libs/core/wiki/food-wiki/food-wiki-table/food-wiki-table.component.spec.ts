import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodWikiTableComponent } from './food-wiki-table.component';

describe('FoodWikiTableComponent', () => {
  let component: FoodWikiTableComponent;
  let fixture: ComponentFixture<FoodWikiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodWikiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodWikiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
