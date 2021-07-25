import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Distance} from '../../model/allclass';
import {DataHandlerService} from '../../services/data-handler.service';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.css']
})
export class InformationDialogComponent implements OnInit {

  dialogTitle: string;
  capitalPopulation = '';
  message: Distance[];

  constructor(
    private dataService: DataHandlerService,
    private dialogRef: MatDialogRef<InformationDialogComponent>, // для работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: Distance[] } // данные, которые передали в диалоговое окно
  ) {
    this.dialogTitle = data.dialogTitle; // выбранная столица
    this.message = data.message; // массив с расстояниями до соседних городов
  }

  ngOnInit(): void {
    //  подписываемся на получение количества людей в выбранной столице
    this.dataService.populationCapitalSubject.subscribe(res => this.capitalPopulation = res);
  }
  // нажали ОК
  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
