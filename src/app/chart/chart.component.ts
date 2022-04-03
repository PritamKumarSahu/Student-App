import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  data: any[] = [
    {
      name: 'Grade 1',
      value: 50,
    },
    {
      name: 'Grade 2',
      value: 30,
    },
    {
      name: 'Grade 3',
      value: 20,
    },
  ];

  view: [number, number] = [700, 400];

  // chart options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme: any = {
    domain: ['#5AA454', '#C7B42C', '#A10A28'],
  };
  constructor(private router: Router) {}
  ngOnInit(): void {}

  onSelect(data: any): void {
    this.router.navigate([`/studentdetail/${data.name}`]);
  }
}
