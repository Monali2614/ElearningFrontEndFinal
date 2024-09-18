import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyStudyWithUsComponent } from './why-study-with-us.component';

describe('WhyStudyWithUsComponent', () => {
  let component: WhyStudyWithUsComponent;
  let fixture: ComponentFixture<WhyStudyWithUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyStudyWithUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyStudyWithUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
