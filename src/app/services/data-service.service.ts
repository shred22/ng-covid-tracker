import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl: string = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/12-27-2020.csv'
  constructor(private httpClient: HttpClient) { }

  getGlobalData() {
     return this.httpClient.get(this.globalDataUrl, {responseType: 'text'}).
     pipe(map(response => {
       let data: GlobalDataSummary[] = [];
       let rows = response.split('\n');
       let raw :  {[index: string]: any} =  {};//Map Key = Country , Value = GlobalDataSummary Object
       rows.splice(0,1);
       rows.splice(rows.length-1, rows.length-1)
       rows.forEach(element => {
         let cols = element.split(/,(?=\S)/);
         
          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10]
          };
          
          let temp: GlobalDataSummary = raw[cs.country];
          
          if(temp) {
            temp.active = cs.active + temp.active!
            temp.confirmed = cs.confirmed + temp.confirmed!
            temp.deaths = cs.deaths + temp.deaths!
            temp.recovered = cs.recovered + temp.recovered!

            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }
 
       });
       
       return <GlobalDataSummary[]>Object.values(raw);
      }
       ))
  }
}
