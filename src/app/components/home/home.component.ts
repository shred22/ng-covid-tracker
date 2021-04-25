import { Component, OnInit } from '@angular/core';

import { GoogleChartInterface } from 'ng2-google-charts';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed: number = 0;
  totalActive: number = 0;
  totalDeaths: number = 0;
  totalRecovered: number = 0;


  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  };
  pieChartWorld: GoogleChartInterface = {
    chartType: 'PieChart'
  };
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart'
  };

  columnChartWorld: GoogleChartInterface = {
    chartType: 'ColumnChart'
  };
  globalData: GlobalDataSummary[] = [];
  constructor(private dataService: DataServiceService) { }




  initChart() {

    let datatable = [];
    let datatableWorld = [];
    datatable.push(["Country", "Cases"]);
    datatableWorld.push(["Country", "Cases"]);

    this.globalData.forEach(cs => {

      if (cs.confirmed! > 10000000) {
        datatable.push([
          cs.country, cs.confirmed
        ]);
      }
      datatableWorld.push([
        cs.country, cs.confirmed
      ]);
    })

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        animation:{
          duration: 1000,
          easing: 'out',
        },
        'Country': 'Cases',
        height: 500
      },
    };
    this.pieChartWorld = {
      chartType: 'PieChart',
      dataTable: datatableWorld,
      //firstRowIsData: true,
      options: {
        animation:{
          duration: 1000,
          easing: 'out',
        },
        'Country': 'Cases',
        height: 500,
      },
    };

    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        animation:{
          duration: 1000,
          easing: 'out',
        },
        'Country': 'Cases',
        height: 500
      },
    };

    this.columnChartWorld = {
      chartType: 'ColumnChart',
      dataTable: datatableWorld,
      //firstRowIsData: true,
      options: {
        animation:{
          duration: 1000,
          easing: 'out',
        },
        'Country': 'Cases',
        height: 500
      },
    };
  }

  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe(

        (result) => {
          result.splice(result.length - 1, result.length - 1)
          this.globalData = result;

          this.globalData.forEach(cs => {
            // console.log(cs.active)
            //console.log("Home  : "+(cs.active)+" : "+cs.recovered+" : "+cs.deaths+" : "+cs.confirmed);

            this.totalActive += cs.active!;
            this.totalConfirmed += cs.confirmed!;
            this.totalDeaths += cs.deaths!;
            this.totalRecovered += cs.recovered!;

          })

          console.log("Calling  init chart")
          this.initChart();
        });

  }

  updateChart(caseType: string) {

    let datatable = [];


      datatable.push(["Country", "Cases"]);

      this.globalData.forEach(cs => {
        let value: number =0;
      if(caseType === 'c')
        if (cs.confirmed! > 10000) {

          value = cs.confirmed!;
          console.log(value)
        }

      if(caseType === 'a')
        if (cs.active! > 20000) {
          value = cs.active!;
        }

      if(caseType === 'r')
        if (cs.recovered! > 100000) {
          value = cs.recovered!;
        }

      if(caseType === 'd')
        if (cs.recovered! > 50000) {
          value = cs.recovered!;
        }

        datatable.push([
          cs.country, value
        ]);
      })


    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        animation:{
          duration: 1000,
          easing: 'out',
        },
        height: 500,
        is3D: true
      },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        animation:{
          duration: 1000,
          easing: 'out',
        },
        height: 500,
        is3D: true
      },
    };
  }

}
