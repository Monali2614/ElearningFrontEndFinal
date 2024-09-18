import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterappComponent } from './footerapp.component';

describe('FooterappComponent', () => {
  let component: FooterappComponent;
  let fixture: ComponentFixture<FooterappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
