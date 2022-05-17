import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Foods } from 'src/app/shared/models/foods.model';

declare var require: any;
//we deploy the new chart types and features in a separate file called highcharts-more.js
let More = require('highcharts/highcharts-more');

More(Highcharts);

@Component({
  selector: 'app-eco2-food-chart',
  templateUrl: './eco2-food-chart.component.html',
  styleUrls: ['./eco2-food-chart.component.css']
})
export class Eco2FoodChartComponent implements OnInit {
  public options: any = {
    chart: {
      type: 'bar',
      height: 800,
      style: {
        fontFamily: 'Montserrat'
      }
    },
    title: {
      text: 'Greenhouse gas emissions per 100 grams of protein',
      style: {
        'font-size': '24px',
        'font-weight': 'bold'
      }
    },
    subtitle: {
      text: "Source: Data is based on the largest meta-analysis of food system impact studies to date, from Poore & Nemecek's 2018 study",
      style: {
        'font-size': '16px',
      },
      widthAdjust: -400
    },
    xAxis:{
      categories: [], // add dynamically later in ngOnInit
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'kilograms of carbon dioxide equivalents (kgCO₂eq) per 100grams of protein',
        align: 'high',
        style: {
          'font-size': '16px'
        }
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' kilogram',
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '{point.category}: {point.y}'
    },
    plotOptions: {
      bar: {
        dataLabels: {
           enabled: true
        }
     }
    },
    legend:{
      enabled:false
    },
    credits:{
      enabled: false
    },
    series: [
      {
        name: "kgCO2e/100g protein",
        data: [], // add dynamically later in ngOnInit
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    this.options.xAxis.categories = Object.keys(Foods.KG_ECO2_PER_100G_DATA);
    this.options.series[0].data = Object.values(Foods.KG_ECO2_PER_100G_DATA);

    Highcharts.chart('food-chart-container', this.options);
  }

}
