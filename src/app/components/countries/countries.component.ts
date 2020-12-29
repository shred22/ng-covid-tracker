import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  totalConfirmed  = 0;
  totalActive:number = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  data: GlobalDataSummary[] =[];
  countries :string[] = [];
  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(result => {
      this.data = result;
      this.data.forEach(cs  => {
        this.countries.push(cs.country!);
      })
      
        
  })};

  updateValues(country: string) {
    
    this.data.forEach(cs =>  {
      
      if(cs.country  ===  country)  {
          this.totalActive =  cs.active!;
          this.totalConfirmed = cs.confirmed!;
          this.totalDeaths = cs.deaths!;
          this.totalRecovered = cs.recovered!;
      }
    })
     
  }

}