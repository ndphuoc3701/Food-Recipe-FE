import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeShareFormComponent } from './recipe-share-form.component';

describe('RecipeShareFormComponent', () => {
  let component: RecipeShareFormComponent;
  let fixture: ComponentFixture<RecipeShareFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeShareFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeShareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
