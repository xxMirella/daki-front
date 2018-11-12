import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsListComponent } from './cards-list.component';

describe('CardsListComponent', () => {
  let component: CardsListComponent;
  let fixture: ComponentFixture<CardsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
