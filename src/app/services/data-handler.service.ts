import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Countries} from '../model/allclass';
import {ErrorDialogComponent} from '../dialog/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  CountryFlag = '';
  distanceSubject = new Subject<number>();
  pointStartSubject = new Subject<string>();
  pointFinishSubject = new Subject<string>();
  someCountriesSubject = new Subject<Countries[]>();

  constructor(
              private http: HttpClient,
              private dialog: MatDialog
  ) { }

  getPointStart(pointStart: string): void {  //  реагируем на изменение max цены
    this.pointStartSubject.next(pointStart);
  }
  getPointFinish(pointFinish: string): void {  //  реагируем на изменение max цены
    this.pointFinishSubject.next(pointFinish);
  }
  calculationRoute(pointStart: string, pointFinish: string): void {
    this.http.post<any>('http://127.0.0.1:5000/onCalculationRoute', {pointStart, pointFinish})
      .subscribe(back => {
        console.log(back);
        this.distanceSubject.next(back);
      });
  }
  someCountries(count: number): void {
    let params = new HttpParams();
    params = params.append('_limit', String(count));
    this.http.get<any>('http://127.0.0.1:5000/getCountries', {params})
      .subscribe(back => {
        this.someCountriesSubject.next(back);
      }, error => {
        this.dialog.open(ErrorDialogComponent, {
          maxWidth: '500px',
          data: {
            dialogTitle: 'Произошла ошибка при получении данных с сервера',
            message: error.message
          },
          autoFocus: false
        });
      });
  }


  getCountryFlag(CountryFlag): string {
    this.CountryFlag = '';
    if (CountryFlag === 'Россия') {
      this.CountryFlag = 'assets/icon/rus.png';
    }
    if (CountryFlag === 'Китай') {
      this.CountryFlag = 'assets/icon/cn.png';
    }
    if (CountryFlag === 'США') {
      this.CountryFlag = 'assets/icon/usa.png';
    }
    if (CountryFlag === 'Германия') {
      this.CountryFlag = 'assets/icon/ger.png';
    }
    if (CountryFlag === 'Япония') {
      this.CountryFlag = 'assets/icon/jp.png';
    }
    if (CountryFlag === 'Канада') {
      this.CountryFlag = 'assets/icon/ca.png';
    }
    if (CountryFlag === 'Индия') {
      this.CountryFlag = 'assets/icon/in.png';
    }
    if (CountryFlag === 'Бразилия') {
      this.CountryFlag = 'assets/icon/bra.png';
    }
    if (CountryFlag === 'Австралия') {
      this.CountryFlag = 'assets/icon/au.png';
    }
    if (CountryFlag === 'Аргентина') {
      this.CountryFlag = 'assets/icon/ar.png';
    }
    return this.CountryFlag;
  }
}
