import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerSingleComponent } from './beer-single.component';

describe('BeerSingleComponent', () => {
  let component: BeerSingleComponent;
  let fixture: ComponentFixture<BeerSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
