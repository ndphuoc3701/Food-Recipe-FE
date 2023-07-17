import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleRecipeComponent } from './schedule-recipe.component';

describe('ScheduleRecipeComponent', () => {
  let component: ScheduleRecipeComponent;
  let fixture: ComponentFixture<ScheduleRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
