import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';


@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {


  inputStart = '';
  inputFinish = '';
  buttonCalc = false;
  buttonClear = false;
  dist = 0;


  constructor(private dataService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataService.pointStartSubject.subscribe(point1 => {
      this.inputStart = point1;
      this.verification(this.inputStart, this.inputFinish);
    });
    this.dataService.pointFinishSubject.subscribe(point2 => {
      this.inputFinish = point2;
      this.verification(this.inputStart, this.inputFinish);
    });
    this.dataService.distanceSubject.subscribe(res => {
      this.dist = res;
    });
  }
  verification(inputStart, inputFinish): void {
    if (inputStart !== '' && inputFinish !== '') {
      this.buttonCalc = true;
    }
    if (inputStart !== '' || inputFinish !== '') {
      this.buttonClear = true;
    }
    if (inputStart === '' && inputFinish === '') {
      this.buttonClear = false;
    }
  }
  clearPoint(n): void {
    this.buttonCalc = false;
    if (n === 0) {
      this.inputStart = '';
      this.dataService.getPointStart( '');
    }
    if (n === 1) {
      this.inputFinish = '';
      this.dataService.getPointFinish( '');
    }
  }

  calc(): void {
    console.log('Start = ', this.inputStart);
    console.log('Finish = ', this.inputFinish);
    this.dataService.calculationRoute(this.inputStart, this.inputFinish);
  }

  clearAll(): void {
    this.buttonCalc = false;
    this.buttonClear = false;
    this.dist = 0;
    this.inputFinish = '';
    this.dataService.getPointFinish( '');
    this.inputStart = '';
    this.dataService.getPointStart( '');

  }
}
