import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let routerSpy: { navigate: any };
  beforeEach(async () => {
    routerSpy = { navigate: jasmine.createSpy('navigate') };
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ChartComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component chart created', () => {
    expect(component).toBeTruthy();
  });

  it(`should navigate to Grade 1 details`, () => {
    component.onSelect({ label: 'Grade 1', name: 'Grade 1', value: 50 });
    expect(routerSpy.navigate).toHaveBeenCalledWith([`/studentdetail/Grade 1`]);
  });
});
