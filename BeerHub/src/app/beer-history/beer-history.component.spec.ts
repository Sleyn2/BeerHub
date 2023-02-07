import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerHistoryComponent } from './beer-history.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('BeerHistoryComponent', () => {
  let component: BeerHistoryComponent;
  let fixture: ComponentFixture<BeerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ BeerHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
