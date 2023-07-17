import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalRecipeComponent } from './edit-personal-recipe.component';

describe('EditPersonalRecipeComponent', () => {
  let component: EditPersonalRecipeComponent;
  let fixture: ComponentFixture<EditPersonalRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPersonalRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPersonalRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
