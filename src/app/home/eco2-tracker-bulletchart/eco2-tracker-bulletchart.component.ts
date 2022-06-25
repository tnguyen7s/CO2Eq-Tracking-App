import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import BulletChart from 'highcharts/modules/bullet';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
import Accessibility from 'highcharts/modules/accessibility';
import { Subscription } from 'rxjs';
import { StatisticsService } from 'src/app/shared/statistics/statistics.service';

//https://www.highcharts.com/docs/chart-and-series-types/bullet-chart
BulletChart(Highcharts);
Exporting(Highcharts);
ExportData(Highcharts);
Accessibility(Highcharts);

@Component({
  selector: 'app-eco2-tracker-bulletchart',
  templateUrl: './eco2-tracker-bulletchart.component.html',
  styleUrls: ['./eco2-tracker-bulletchart.component.scss']
})
export class Eco2TrackerBulletchartComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public isLoading = false;

  public chartOptions = {
    chart: {
      type: "bullet",
      inverted: true,
      marginLeft: 135,
      height: 140,
      marginTop: 40,
    },
    title: {
      text: 'Your Emission so far this month'
    },
    legend: {
        enabled: false
    },
    xAxis: {
      categories: ['<span class="hc-cat-title">CO2eq</span><br/>Kilogram']
    },
    yAxis: {
        gridLineWidth: 0,
        plotBands: [{
          from: 0,
          to: 0,
          color: '#bfbfbf' // 30 percentile
        }, {
          from: 0,
          to: 0,
          color: '#767676' // 30 percentile
        }, {
          from: 0,
          to: 0,
          color: '#454545' // 30 percentile
        }, {
          from: 0,
          to: 0,
          color: '#000000' // 10 percentile
        }
      ],
      title: null
    },
    plotOptions: {
        bullet: {
            pointPadding: 0.35,
            borderWidth: 0,
            color: '#FDDA16',
            targetOptions: {
                width: '400%'
            }
        }
    },
    series: [{
      type: undefined,
      data: [{
          y: 0, // total co2 equivalent by month
          target: 0 // set by user
      }]
    }],
    tooltip: {
      pointFormat: '<div class="tooltip-style"><b>{point.y}</b></div> (with target at {point.target})'
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false
    }
  };

  constructor(private statisticsService: StatisticsService) { }

  async ngOnInit(){
    this.isLoading = true;

    // set y
    this.chartOptions.series[0].data[0].y = await this.statisticsService.getTotalEco2ThisMonth();

    // when user reset the limit, redraw the chart
    this.sub = this.statisticsService.monthlyLimit.subscribe((value)=>{
        this.drawChart(value);
    });

    this.isLoading = false;
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  drawChart(limit)
  {
    if (limit){
      // set the chart target
      this.chartOptions.series[0].data[0].target = limit;

      // set chart plot bands
      this.chartOptions.yAxis.plotBands[0].to = limit*0.3;
      this.chartOptions.yAxis.plotBands[1].from = limit*0.3;
      this.chartOptions.yAxis.plotBands[1].to = limit*0.6;
      this.chartOptions.yAxis.plotBands[2].from = limit*0.6;
      this.chartOptions.yAxis.plotBands[2].to = limit*0.9;
      this.chartOptions.yAxis.plotBands[3].from = limit*0.9;
      this.chartOptions.yAxis.plotBands[3].to = 1200;

      // draw chart with the given option
      Highcharts.chart('bullet-chart-container', this.chartOptions);
    }
  }
}
