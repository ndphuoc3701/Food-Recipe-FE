import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearntRecipeComponent } from './learnt-recipe.component';

describe('LearntRecipeComponent', () => {
  let component: LearntRecipeComponent;
  let fixture: ComponentFixture<LearntRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearntRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearntRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
