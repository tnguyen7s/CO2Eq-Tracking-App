import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as Highcharts from 'highcharts';
import TileMap from 'highcharts/modules/tilemap';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
import Accessibility from 'highcharts/modules/accessibility';
import HeatMap from 'highcharts/modules/heatmap';

HeatMap(Highcharts);
TileMap(Highcharts);
Exporting(Highcharts);
ExportData(Highcharts);
Accessibility(Highcharts);
@Component({
  selector: 'app-eco2-flight-chart',
  templateUrl: './eco2-flight-chart.component.html',
  styleUrls: ['./eco2-flight-chart.component.css']
})
export class Eco2FlightChartComponent implements OnInit {
  public showInfoBox = false;
  public flightForm: FormGroup;

  public options ={
    chart: {
      type: 'tilemap',
      inverted: true,
      height: '70%',
      backgroundColor: "#c9eafe"
    },
    accessibility: {
      description: "Taking a long-haul flight generates more carbon emissions than the average person in some countries around the world produces in a year"
    },
    screenReaderSection: {
      beforeChartFormat:
        '<h5>{chartTitle}</h5>'+
        '<div>{chartSubtitle}</div>'+
        '<div>{chartLongdesc}</div>' +
        '<div>{viewTableButton}</div>',
      point: {
        valueDescriptionFormat: '{index}. {xDescription}, {point.value}.'
      }
    },
    title: {
      text: 'Taking a long-haul flight generates more carbon emissions than the average person in some countries produces in a year',
      style: {
        'font-size': '24px',
        'font-weight': 'bold'
      },
      widthAdjust: -120
    },
    subtitle: {
      text: 'Idea taken from: <a style="font-size: 14px" href="https://www.theguardian.com/environment/ng-interactive/2019/jul/19/carbon-calculator-how-taking-one-flight-emits-as-much-as-many-people-do-in-a-year" target="_blank">Guardian</a>',
      style: {
        'font-size': '14px',
      },
      widthAdjust: -120
    },

    xAxis: {
      visible: false
    },

    yAxis: {
      visible: false
    },
    //https://ourworldindata.org/grapher/co-emissions-per-capita
    colorAxis: {
      dataClasses: [
        {
          from: -1,
          to: 0,
          color: '#0da2ff',
          name: 'Unknown'
        },
        {
          from: 0,
          to: 1000,
          color: '#bfbfbf',
          name: '< 1K kgCO2eq'
        },
        {
          from: 1000,
          to: 5000,
          color: '#767676',
          name: '1K-5K kgCO2eq'
        },
        {
          from: 5000,
          to: 10000,
          color: '#454545',
          name: '5K-10K kgCO2eq'
        },
        {
          from: 10000,
          color: '#000000',
          name: '> 10K kgCO2eq'
        }
        ,
        {
          from: 0,
          to: 234,
          color: "#04c153",
          name: 'Country whose average person produces CO2eq in a whole year less than that of taking one return flight'
        }
      ]
    },
    tooltip: {
      headerFormat: '',
      pointFormat:'An average person in <b>{point.name}</b> produces <b>{point.value}</b> kgCO2eq <br>in 2020.'
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.hc-a2}',
          color: '#ffffff',
          style: {
            textOutline: "none"
          }
        }
      }
    },
    // annotations: [{
    //   shapes: [{
    //     point: {
    //       x: 17,
    //       y: 15,
    //       xAxis: 1,
    //       yAxis: 1
    //     },
    //     text: 'Malawi'
    //   }
    //   ]
    // }],
    series: [
      {
        name: '',
        data: [
          // C1
          {
            'hc-a2': 'CA',
            name: 'Canada',
            x: 1,
            y: 1,
            value: 14200,
          },
          {
            'hc-a2': 'US',
            name: 'America',
            x: 2,
            y: 1,
            value: 9810,
          },
          {
            'hc-a2': 'MX',
            name: 'Mexico',
            x: 3,
            y: 1,
            value: 2770,
          },
          {
            'hc-a2': 'GT',
            name: 'Guatemala',
            x: 4,
            y: 1,
            value: 1060,
          },
          {
            'hc-a2': 'SV',
            name: 'El Salvador',
            x: 5,
            y: 1,
            value: 940,
          },
          // C2
          {
            'hc-a2': 'BZ',
            name: 'BELIZE',
            x: 3,
            y: 2,
            value: 1470,
          },
          {
            'hc-a2': 'HN',
            name: 'HONDURAS',
            x: 5,
            y: 2,
            value: 980,
          },
          {
            'hc-a2': 'NI',
            name: 'NICARAGUA',
            x: 6,
            y: 2,
            value: 770,
          },
          // C3
          {
            'hc-a2': 'CR',
            name: 'Costa Rica',
            x: 7,
            y: 3,
            value: 1550,
          },

          // C4
          {
            'hc-a2': 'BS',
            name: 'BAHAMAS',
            x: 2,
            y: 4,
            value: 5940,
          },
          {
            'hc-a2': 'CU',
            name: 'CUBA',
            x: 3,
            y: 4,
            value: 1780,
          },
          {
            'hc-a2': 'JM',
            name: 'Jamaica',
            x: 4,
            y: 4,
            value: 2510,
          },
          {
            'hc-a2': 'PA',
            name: 'Panama',
            x: 8,
            y: 4,
            value: 2500,
          },
          // C5
          {
            'hc-a2': 'HT',
            name: 'Haiti',
            x: 4,
            y: 5,
            value: 260,
          },
          {
            'hc-a2': 'CO',
            name: 'Colombia',
            x: 9,
            y: 5,
            value: 1750,
          },
          {
            'hc-a2': 'EC',
            name: 'Ecuador',
            x: 10,
            y: 5,
            value: 1750,
          },
          {
            'hc-a2': 'PE',
            name: 'Peru',
            x: 11,
            y: 5,
            value: 1360,
          },
          // C6
          {
            'hc-a2': 'DO',
            name: 'Dominican Republic',
            x: 4,
            y: 6,
            value: 2560,
          },
          {
            'hc-a2': 'KN',
            name: 'Saint Kitts And Nevis',
            x: 5,
            y: 6,
            value: 3990,
          },
          {
            'hc-a2': 'VE',
            name: 'Venezuela',
            x: 9,
            y: 6,
            value: 2980,
          },
          {
            'hc-a2': 'GY',
            name: 'Guyana',
            x: 10,
            y: 6,
            value: 2810,
          },
          {
            'hc-a2': 'BO',
            name: 'Bolivia',
            x: 11,
            y: 6,
            value: 1770,
          },
          {
            'hc-a2': 'PY',
            name: 'Paraguay',
            x: 12,
            y: 6,
            value: 1060,
          },
          {
            'hc-a2': 'CL',
            name: 'Chile',
            x: 13,
            y: 6,
            value: 4250,
          },
          {
            'hc-a2': 'AR',
            name: 'Argentina',
            x: 14,
            y: 6,
            value: 3470,
          },
          // C7
          {
            'hc-a2': 'AG',
            name: 'Antigua And Barbuda',
            x: 4,
            y: 7,
            value: 4400,
          },
          {
            'hc-a2': 'LC',
            name: 'Saint Lucia',
            x: 5,
            y: 7,
            value: 2400,
          },
          {
            'hc-a2': 'VC',
            name: 'Saint Vincent And The Grenadines',
            x: 6,
            y: 7,
            value: 1880,
          },
          {
            'hc-a2': 'DM',
            name: 'Dominica',
            x: 7,
            y: 7,
            value: 1930,
          },
          {
            'hc-a2': 'GD',
            name: 'Grenada',
            x: 8,
            y: 7,
            value: 2620,
          },
          {
            'hc-a2': 'TT',
            name: 'Trinidad And Tobago',
            x: 9,
            y: 7,
            value: 25370,
          },
          {
            'hc-a2': 'SR',
            name: 'Suriname',
            x: 11,
            y: 7,
            value: 3790,
          },
          {
            'hc-a2': 'UY',
            name: 'Uruguay',
            x: 12,
            y: 7,
            value: 1680,
          },
          // C8
          {
            'hc-a2': 'GL',
            name: 'Greenland',
            x: 1,
            y: 8,
            value: 9060,
          },
          {
            'hc-a2': 'BB',
            name: 'Barbados',
            x: 6,
            y: 8,
            value: 3780,
          },
          {
            'hc-a2': 'BR',
            name: 'Brazil',
            x: 11,
            y: 8,
            value: 2200,
          },
          // C9
          // C10
          {
            'hc-a2': 'IS',
            name: 'Iceland',
            x: 1,
            y: 10,
            value: 8600,
          },
          {
            'hc-a2': 'IE',
            name: 'Ireland',
            x: 4,
            y: 10,
            value: 6750,
          },
          {
            'hc-a2': 'CV',
            name: 'Cape Verde',
            x: 15,
            y: 10,
            value: 990,
          },
          // C11
          {
            'hc-a2': 'UK',
            name: '	United Kingdom',
            x: 4,
            y: 11,
            value: 4850
          },
          {
            'hc-a2': 'PT',
            name: 'Portugal',
            x: 6,
            y: 11,
            value: 3960
          },
          {
            'hc-a2': 'MT',
            name: 'Malta',
            x: 8,
            y: 11,
            value: 3610
          },
          {
            'hc-a2': 'MR',
            name: 'Mauritania',
            x: 12,
            y: 11,
            value: 730
          },
          {
            'hc-a2': 'GW',
            name: 'Guinea-Bissau',
            x: 13,
            y: 11,
            value: 150
          },
          {
            'hc-a2': 'GN',
            name: 'Guinea',
            x: 14,
            y: 11,
            value: 7320
          },
          {
            'hc-a2': 'ST',
            name: 'Sao Tome And Principe',
            x: 16,
            y: 11,
            value: 260
          },

          // C12
          {
            'hc-a2': 'FR',
            name: 'France',
            x: 5,
            y: 12,
            value: 4240
          },
          {
            'hc-a2': 'ES',
            name: 'Spain',
            x: 6,
            y: 12,
            value: 4470
          },
          {
            'hc-a2': 'MA',
            name: 'Morocco',
            x: 11,
            y: 12,
            value: 1750
          },
          {
            'hc-a2': 'GM',
            name: 'Gambia',
            x: 12,
            y: 12,
            value: 210
          },
          {
            'hc-a2': 'SL',
            name: 'Sierra Leone',
            x: 13,
            y: 12,
            value: 110
          },
          {
            'hc-a2': 'LR',
            name: 'Liberia',
            x: 14,
            y: 12,
            value: 200
          },
          {
            'hc-a2': 'CI',
            name: 'Cote D’Ivoire',
            x: 15,
            y: 12,
            value: 380
          },
          // C13
          {
            'hc-a2': 'NL',
            name: 'Netherlands',
            x: 4,
            y: 13,
            value: 8060
          },
          {
            'hc-a2': 'BE',
            name: 'Belgium',
            x: 5,
            y: 13,
            value: 7230
          },
          {
            'hc-a2': 'LU',
            name: 'Luxembourg',
            x: 6,
            y: 13,
            value: 13060
          },
          {
            'hc-a2': 'IT',
            name: 'Italy',
            x: 7,
            y: 13,
            value: 5020
          },
          {
            'hc-a2': 'DZ',
            name: 'Algeria',
            x: 11,
            y: 13,
            value: 3530
          },
          {
            'hc-a2': 'SN',
            name: 'Senegal',
            x: 12,
            y: 13,
            value: 620
          },
          {
            'hc-a2': 'BF',
            name: 'Burkina Faso',
            x: 13,
            y: 13,
            value: 190
          },
          {
            'hc-a2': 'GH',
            name: 'Ghana',
            x: 14,
            y: 13,
            value: 520
          },
          {
            'hc-a2': 'NG',
            name: 'Nigeria',
            x: 15,
            y: 13,
            value: 610
          },
          {
            'hc-a2': 'GQ',
            name: 'Equatorial Guinea',
            x: 16,
            y: 13,
            value: 7320
          },
          {
            'hc-a2': 'AO',
            name: 'Angola',
            x: 17,
            y: 13,
            value: 680
          },
          // C14
          {
            'hc-a2': 'DK',
            name: 'Denmark',
            x: 3,
            y: 14,
            value: 4520
          },
          {
            'hc-a2': 'DE',
            name: 'Germany',
            x: 4,
            y: 14,
            value: 7690
          },
          {
            'hc-a2': 'CH',
            name: 'Switzerland',
            x: 5,
            y: 14,
            value: 3730
          },
          {
            'hc-a2': 'SI',
            name: 'Slovenia',
            x: 6,
            y: 14,
            value: 6040
          },
          {
            'hc-a2': 'HR',
            name: 'Croatia',
            x: 7,
            y: 14,
            value: 4140
          },
          {
            'hc-a2': 'TN',
            name: 'Tunisia',
            x: 11,
            y: 14,
            value: 2380
          },
          {
            'hc-a2': 'ML',
            name: 'Mali',
            x: 12,
            y: 14,
            value: 170
          },
          {
            'hc-a2': 'TD',
            name: 'Chad',
            x: 13,
            y: 14,
            value: 60
          },
          {
            'hc-a2': 'TG',
            name: 'Togo',
            x: 14,
            y: 14,
            value: 260
          },
          {
            'hc-a2': 'CM',
            name: 'Cameroon',
            x: 15,
            y: 14,
            value: 260
          },
          {
            'hc-a2': 'CG',
            name: 'Congo',
            x: 16,
            y: 14,
            value: 560
          },
          {
            'hc-a2': 'GA',
            name: 'Gabon',
            x: 17,
            y: 14,
            value: 1930
          },
          {
            'hc-a2': 'ZM',
            name: 'Zambia',
            x: 18,
            y: 14,
            value: 360
          },
          //C15
          {
            'hc-a2': 'NO',
            name: 'Norway',
            x: 1,
            y: 15,
            value: 7620
          },
          {
            'hc-a2': 'PL',
            name: 'Poland',
            x: 4,
            y: 15,
            value: 7920
          },
          {
            'hc-a2': 'CZ',
            name: 'Czech Republic',
            x: 5,
            y: 15,
            value: 8210
          },
          {
            'hc-a2': 'AT',
            name: 'Austria',
            x: 6,
            y: 15,
            value: 6730
          },
          {
            'hc-a2': 'BA',
            name: 'Bosnia And Herzegovina',
            x: 7,
            y: 15,
            value: 6530
          },
          {
            'hc-a2': 'ME',
            name: 'Montenegro',
            x: 8,
            y: 15,
            value: 3680
          },
          {
            'hc-a2': 'AL',
            name: 'Albania',
            x: 9,
            y: 15,
            value: 1580
          },
          {
            'hc-a2': 'LY',
            name: 'Libyan Arab Jamahiriya',
            x: 11,
            y: 15,
            value: 7380
          },
          {
            'hc-a2': 'NE',
            name: 'Niger',
            x: 12,
            y: 15,
            value: 70
          },
          {
            'hc-a2': 'SS',
            name: 'South Sudan',
            x: 13,
            y: 15,
            value: 110
          },
          {
            'hc-a2': 'BJ',
            name: 'Benin',
            x: 14,
            y: 15,
            value: 550
          },
          {
            'hc-a2': 'CD',
            name: 'Congo, Democratic Republic',
            x: 15,
            y: 15,
            value: 560
          },
          {
            'hc-a2': 'BI',
            name: 'Burundi',
            x: 16,
            y: 15,
            value: 50
          },
          {
            'hc-a2': 'MW',
            name: 'Malawi',
            x: 17,
            y: 15,
            value: 70
          },
          {
            'hc-a2': 'BW',
            name: 'Botswana',
            x: 18,
            y: 15,
            value: 2770
          },
          {
            'hc-a2': 'NA',
            name: 'Namibia',
            x: 19,
            y: 15,
            value: 1530
          },
          // C16
          {
            'hc-a2': 'SE',
            name: 'Sweden',
            x: 1,
            y: 16,
            value: 3830
          },
          {
            'hc-a2': 'LT',
            name: 'Lithuania',
            x: 4,
            y: 16,
            value: 5070
          },
          {
            'hc-a2': 'SK',
            name: 'Slovakia',
            x: 5,
            y: 16,
            value: 5630
          },
          {
            'hc-a2': 'HU',
            name: 'Hungary',
            x: 6,
            y: 16,
            value: 5000
          },
          {
            'hc-a2': 'RS',
            name: 'Republic of Serbia',
            x: 7,
            y: 16,
            value: 4940
          },
          {
            'hc-a2': 'XK',
            name: 'Kosovo',
            x: 8,
            y: 16,
            value: -1
          },
          {
            'hc-a2': 'GR',
            name: 'Greece',
            x: 9,
            y: 16,
            value: 5010
          },
          {
            'hc-a2': 'EG',
            name: 'Egypt',
            x: 11,
            y: 16,
            value: 2090
          },
          {
            'hc-a2': 'SD',
            name: 'Sudan',
            x: 12,
            y: 16,
            value: 430
          },
          {
            'hc-a2': 'ER',
            name: 'Eritrea',
            x: 13,
            y: 16,
            value: 200
          },
          {
            'hc-a2': 'CF',
            name: 'Central African Republic',
            x: 14,
            y: 16,
            value: 40
          },
          {
            'hc-a2': 'UG',
            name: 'Uganda',
            x: 15,
            y: 16,
            value: 110
          },
          {
            'hc-a2': 'RW',
            name: 'Rwanda',
            x: 16,
            y: 16,
            value: 80
          },
          {
            'hc-a2': 'MZ',
            name: 'Mozambique',
            x: 17,
            y: 16,
            value: 210
          },
          {
            'hc-a2': 'ZW',
            name: 'Zimbabwe',
            x: 18,
            y: 16,
            value: 710
          },
          {
            'hc-a2': 'SZ',
            name: 'Swaziland',
            x: 19,
            y: 16,
            value: -1
          },
          {
            'hc-a2': 'ZA',
            name: 'South Africa',
            x: 20,
            y: 16,
            value: 7620
          },
          // C17
          {
            'hc-a2': 'FI',
            name: 'Finland',
            x: 1,
            y: 17,
            value: 7090
          },
          {
            'hc-a2': 'EE',
            name: 'Estonia',
            x: 2,
            y: 17,
            value: 7880
          },
          {
            'hc-a2': 'LV',
            name: 'Latvia',
            x: 3,
            y: 17,
            value: 3590
          },
          {
            'hc-a2': 'BY',
            name: 'Belarus',
            x: 4,
            y: 17,
            value: 6080
          },
          {
            'hc-a2': 'UA',
            name: 'Ukraine',
            x: 5,
            y: 17,
            value: 4890
          },
          {
            'hc-a2': 'RO',
            name: 'Romania',
            x: 6,
            y: 17,
            value: 3720
          },
          {
            'hc-a2': 'BG',
            name: 'Bulgaria',
            x: 7,
            y: 17,
            value: 5390
          },
          {
            'hc-a2': 'MK',
            name: 'Macedonia',
            x: 8,
            y: 17,
            value: 3430
          },
          {
            'hc-a2': 'CY',
            name: 'Cyprus',
            x: 10,
            y: 17,
            value: 5380
          },
          {
            'hc-a2': 'DJ',
            name: 'Djibouti',
            x: 13,
            y: 17,
            value: 360
          },
          {
            'hc-a2': 'ET',
            name: 'Ethiopia',
            x: 14,
            y: 17,
            value: 130
          },
          {
            'hc-a2': 'KE',
            name: 'Kenya',
            x: 15,
            y: 17,
            value: 300
          },
          {
            'hc-a2': 'TZ',
            name: 'Tanzani',
            x: 16,
            y: 17,
            value: 180
          },
          {
            'hc-a2': 'LS',
            name: 'Lesotho',
            x: 19,
            y: 17,
            value: 1020
          },
          // C18
          {
            'hc-a2': 'MD',
            name: 'Moldova',
            x: 5,
            y: 18,
            value: 1280
          },
          {
            'hc-a2': 'TR',
            name: 'Turkey',
            x: 7,
            y: 18,
            value: 4660
          },
          {
            'hc-a2': 'JO',
            name: 'Jordan',
            x: 8,
            y: 18,
            value: 2500
          },
          {
            'hc-a2': 'LB',
            name: 'Lebanon',
            x: 9,
            y: 18,
            value: 3800
          },
          {
            'hc-a2': 'IL',
            name: 'Israel',
            x: 10,
            y: 18,
            value: 6510
          },
          {
            'hc-a2': 'YE',
            name: 'Yemen',
            x: 11,
            y: 18,
            value: 330
          },
          {
            'hc-a2': 'SO',
            name: 'Somalia',
            x: 14,
            y: 18,
            value: 40
          },
          {
            'hc-a2': 'SC',
            name: 'Seychelles',
            x: 17,
            y: 18,
            value: 4990
          },
          {
            'hc-a2': 'KM',
            name: 'Comoros',
            x: 18,
            y: 18,
            value: 300
          },
          // C19
          {
            'hc-a2': 'SY',
            name: 'Syria',
            x: 7,
            y: 19,
            value: 1740
          },
          {
            'hc-a2': 'KW',
            name: 'Kuwait',
            x: 8,
            y: 19,
            value: 20830
          },
          {
            'hc-a2': 'SA',
            name: 'Saudi Arabia',
            x: 9,
            y: 19,
            value: 17970
          },
          {
            'hc-a2': 'QA',
            name: 'Qatar',
            x: 10,
            y: 19,
            value: 37020
          },
          {
            'hc-a2': 'OM',
            name: 'Oman',
            x: 11,
            y: 19,
            value: 12170
          },
          {
            'hc-a2': 'MG',
            name: 'Madagascar',
            x: 19,
            y: 19,
            value: 130
          },
          {
            'hc-a2': 'MU',
            name: 'Mauritius',
            x: 20,
            y: 19,
            value: 3130
          },
          // C20
          {
            'hc-a2': 'AM',
            name: 'Armenia',
            x: 6,
            y: 20,
            value: 1990
          },
          {
            'hc-a2': 'IQ',
            name: 'Iraq',
            x: 7,
            y: 20,
            value: 5240
          },
          {
            'hc-a2': 'IR',
            name: 'Iran',
            x: 8,
            y: 20,
            value: 8870
          },
          {
            'hc-a2': 'BH',
            name: 'Bahrain',
            x: 9,
            y: 20,
            value: 20550
          },
          {
            'hc-a2': 'AE',
            name: 'United Arab Emirates',
            x: 10,
            y: 20,
            value: 15190
          },
          //C21
          {
            'hc-a2': 'GE',
            name: 'Georgia',
            x: 6,
            y: 21,
            value: 2500
          },
          {
            'hc-a2': 'AZ',
            name: 'Azerbaijan',
            x: 7,
            y: 21,
            value: 3720
          },
          {
            'hc-a2': 'PK',
            name: 'Pakistan',
            x: 8,
            y: 21,
            value: 1060
          },
          {
            'hc-a2': 'MV',
            name: 'Maldives',
            x: 12,
            y: 21,
            value: 3320
          },
          // C22
          {
            'hc-a2': 'UZ',
            name: 'Uzbekistan',
            x: 6,
            y: 22,
            value: 3370
          },
          {
            'hc-a2': 'TM',
            name: 'Turkmenistan',
            x: 7,
            y: 22,
            value: 12490
          },
          {
            'hc-a2': 'AF',
            name: 'Afghanistan',
            x: 8,
            y: 22,
            value: 310
          },
          {
            'hc-a2': 'IN',
            name: 'India',
            x: 9,
            y: 22,
            value: 1770
          },
          {
            'hc-a2': 'LK',
            name: 'Sri Lanka',
            x: 11,
            y: 22,
            value: 990
          },
          // C23
          {
            'hc-a2': 'KG',
            name: 'Kyrgyzstan',
            x: 6,
            y: 23,
            value: 1760
          },
          {
            'hc-a2': 'TJ',
            name: 'Tajikistan',
            x: 7,
            y: 23,
            value: 990
          },
          {
            'hc-a2': 'BD',
            name: 'Bangladesh',
            x: 8,
            y: 23,
            value: 560
          },
          {
            'hc-a2': 'NP',
            name: 'Nepal',
            x: 9,
            y: 23,
            value: 580
          },
          // C24
          {
            'hc-a2': 'KZ',
            name: 'Kazakhstan',
            x: 5,
            y: 24,
            value: 15520
          },
          {
            'hc-a2': 'CN',
            name: 'China',
            x: 6,
            y: 24,
            value: 7410
          },
          {
            'hc-a2': 'BT',
            name: 'Bhutan',
            x: 7,
            y: 24,
            value: 2500
          },
          {
            'hc-a2': 'MM',
            name: 'Myanmar',
            x: 8,
            y: 24,
            value: 670
          },
          {
            'hc-a2': 'TH',
            name: 'Thailand',
            x: 10,
            y: 24,
            value: 3690
          },
          {
            'hc-a2': 'MY',
            name: 'Malaysia',
            x: 11,
            y: 24,
            value: 8420
          },
          {
            'hc-a2': 'SG',
            name: 'Singapore',
            x: 13,
            y: 24,
            value: 7780
          },
          {
            'hc-a2': 'AU',
            name: 'Australia',
            x: 19,
            y: 24,
            value: 15370
          },

          // C25
          {
            'hc-a2': 'RU',
            name: 'Russian Federation',
            x: 4,
            y: 25,
            value: 10810
          },
          {
            'hc-a2': 'MN',
            name: 'Mongolia',
            x: 5,
            y: 25,
            value: 26980
          },
          {
            'hc-a2': 'KP',
            name: "North Korea",
            x: 6,
            y: 25,
            value: 1140
          },
          {
            'hc-a2': 'KR',
            name: 'South Korea',
            x: 7,
            y: 25,
            value: 11660
          },
          {
            'hc-a2': 'LA',
            name: 'Laos',
            x: 9,
            y: 25,
            value: 4650
          },
          {
            'hc-a2': 'KH',
            name: 'Cambodia',
            x: 10,
            y: 25,
            value: 920
          },
          {
            'hc-a2': 'BN',
            name: 'Brunei',
            x: 12,
            y: 25,
            value: 23220
          },
          {
            'hc-a2': 'ID',
            name: 'Indonesia',
            x: 13,
            y: 25,
            value: 2160
          },
          {
            'hc-a2': 'TL',
            name: 'East Timor',
            x: 14,
            y: 25,
            value: 400
          },
          {
            'hc-a2': 'PW',
            name: 'Republic of Palau',
            x: 16,
            y: 25,
            value: 12120
          },
          {
            'hc-a2': 'PG',
            name: 'Papua New Guinea',
            x: 17,
            y: 25,
            value: 740
          },

          // C26
          {
            'hc-a2': 'VN',
            name: 'Vietnam',
            x: 9,
            y: 26,
            value: 2610
          },
          {
            'hc-a2': 'PH',
            name: 'Philippines',
            x: 11,
            y: 26,
            value: 1240
          },
          {
            'hc-a2': 'MH',
            name: 'Marshall Islands',
            x: 15,
            y: 26,
            value: 2560
          },
          {
            'hc-a2': 'FM',
            name: 'Micronesia',
            x: 16,
            y: 26,
            value: 1280
          },
          {
            'hc-a2': 'NR',
            name: 'Nauru',
            x: 17,
            y: 26,
            value: 5240
          },
          {
            'hc-a2': 'SB',
            name: 'Solomon Islands',
            x: 18,
            y: 26,
            value: 430
          },
          {
            'hc-a2': 'VU',
            name: 'Vanuatu',
            x: 19,
            y: 26,
            value: 590
          },
          {
            'hc-a2': 'NZ',
            name: 'New Zealand',
            x: 21,
            y: 26,
            value: 6940
          },
          // C27
          {
            'hc-a2': 'JP',
            name: 'Japan',
            x: 6,
            y: 27,
            value: 8150
          },
          {
            'hc-a2': 'KI',
            name: 'Kiribati',
            x: 17,
            y: 27,
            value: 570
          },
          {
            'hc-a2': 'TV',
            name: 'Tuvalu',
            x: 18,
            y: 27,
            value: 640
          },
          {
            'hc-a2': 'FJ',
            name: 'Fiji',
            x: 19,
            y: 27,
            value: 1550
          },

          //C28
          {
            'hc-a2': 'WS',
            name: 'Samoa',
            x: 18,
            y: 28,
            value: 1240
          },
          {
            'hc-a2': 'TO',
            name: 'Tonga',
            x: 19,
            y: 28,
            value: 1360
          }
        ],
        type: undefined
      }
    ]

  };
  constructor() { }

  ngOnInit(): void {
    this.flightForm = new FormGroup({
      "flight": new FormControl("Chicago–New York City")
    });

    this.flightForm.get("flight").valueChanges.subscribe(value=>{
      this.drawChart(value);
    });

    this.drawChart(this.flightForm.get("flight").value)
  }

  private drawChart(flight: string)
  {
    const dataClasses =  this.options.colorAxis.dataClasses;
    let from = "";
    let to = "";
    switch(flight){
      case "Chicago–New York City":
        dataClasses[dataClasses.length-1].to = 349;
        from = "Chicago";
        to = "New York City"
        break;
      case "New York City–Los Angeles":
        dataClasses[dataClasses.length-1].to = 1191;
        from = "New York City";
        to = "Los Angeles"
        break;
      case "Los Angeles–France":
        dataClasses[dataClasses.length-1].to =  2722;
        from = "Los Angeles";
        to = "France"
        break;
      case "Los Angeles–Vietnam":
        dataClasses[dataClasses.length-1].to = 4464;
        from = "Los Angeles";
        to = "Vietnam"
        break;
      default:
        dataClasses[dataClasses.length-1].to = 0;
    }

    dataClasses[dataClasses.length-1].name += " from " + from + " to " + to;
    if (from==="") dataClasses[dataClasses.length-1].name = "Not used"

    Highcharts.chart('flight-chart-container', this.options);
  }
}
