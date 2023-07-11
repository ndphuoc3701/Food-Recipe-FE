import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalRecipeListComponent } from './personal-recipe-list.component';

describe('PersonalRecipeListComponent', () => {
  let component: PersonalRecipeListComponent;
  let fixture: ComponentFixture<PersonalRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalRecipeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
