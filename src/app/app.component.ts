import {Component, OnInit} from '@angular/core';
import {Countries} from './model/allclass';
import {DataHandlerService} from './services/data-handler.service';
import {Setting} from './model/setting';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  allCountries: Countries[];
  inputStart: string;
  inputFinish: string;
  startCountCountries = 1;

  constructor(private dataService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.startCountCountries = Setting.countCountriesStart;  // данные из фаила setting.ts
    this.dataService.someCountries(this.startCountCountries);
    this.dataService.someCountriesSubject.subscribe(res => {
      this.allCountries = res;
    });
  }

  inputCapital1(input: string): void {
    this.inputStart = input;
  }
  inputCapital2(input: string): void {
    this.inputFinish = input;
  }
}
