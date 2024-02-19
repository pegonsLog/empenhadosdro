import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleFormComponent } from './responsible-form.component';

describe('ResponsibleFormComponent', () => {
  let component: ResponsibleFormComponent;
  let fixture: ComponentFixture<ResponsibleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsibleFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsibleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
