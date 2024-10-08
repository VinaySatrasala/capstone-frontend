import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelsComponent } from './fuels.component';

describe('FuelsComponent', () => {
  let component: FuelsComponent;
  let fixture: ComponentFixture<FuelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
