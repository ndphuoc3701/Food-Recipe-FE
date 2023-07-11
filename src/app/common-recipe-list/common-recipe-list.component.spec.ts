import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonRecipeListComponent } from './common-recipe-list.component';

describe('CommonRecipeListComponent', () => {
  let component: CommonRecipeListComponent;
  let fixture: ComponentFixture<CommonRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonRecipeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
