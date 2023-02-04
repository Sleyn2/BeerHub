import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerTypesComponent } from './beer-types.component';

describe('BeerTypesComponent', () => {
  let component: BeerTypesComponent;
  let fixture: ComponentFixture<BeerTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
