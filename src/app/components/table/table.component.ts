import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Countries} from '../../model/allclass';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataHandlerService} from '../../services/data-handler.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  allCountries: Countries[];
  capitalOnClick: string[] = ['', ''];
  strClick: string;
  capitalStart = '';
  capitalFinish = '';
  count = 0;
  inputNumber = 7;

  @Input('countries')
  private set setCountries(countries: Countries[]) { // напрямую не присваиваем значения в переменную, только через @Input
    this.allCountries = countries;
    this.fillTable();
  }

  @Output()
  startClick = new EventEmitter<string>();
  @Output()
  finishClick = new EventEmitter<string>();

  dataSource: MatTableDataSource<Countries>; // контейнер - источник данных для таблицы
  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  displayedColumns: string[] = ['id', 'country', 'capital', 'population', 'square', 'operations'];

  // ссылки на компоненты таблицы
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  constructor(
    private dataService: DataHandlerService, // доступ к данным
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fillTable();
    this.dataService.pointStartSubject.subscribe(point1 => {
      this.capitalStart = point1;
      if (this.capitalStart === '') {
        this.count = 0;
      }
      // console.log('pointStartSubject = ', this.capitalStart);
      // console.log('pointFinishSubject = ', this.capitalFinish);
    });
    this.dataService.pointFinishSubject.subscribe(point2 => {
      this.capitalFinish = point2;
      if (this.capitalFinish === '') {
        this.count = 1;
      }
      // console.log('pointStartSubject = ', this.capitalStart);
      // console.log('pointFinishSubject = ', this.capitalFinish);
    });
  }

  private fillTable(): void {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.allCountries; // обновить источник данных (т.к. данные массива soft обновились)
    this.addTableObjects();
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDeleteDialog(element): void {

  }

  openEditDialog(element): void {

  }

  capitalClick(capital): void {
    if (this.strClick !== capital) {  //  исключаем множественный запрос по одному и тому же элементу
      this.strClick = capital;
      if (this.count === 0) {
        this.capitalStart = capital;
        this.count = 1;
        this.dataService.getPointStart(this.capitalStart);
      } else {
        this.capitalFinish = capital;
        this.dataService.getPointFinish(this.capitalFinish);
        this.count = 0;
      }

    }
  }

  xxx(): void {

  }

  allCount(): void {
    this.dataService.someCountries(this.inputNumber);
  }
}
