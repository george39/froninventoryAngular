import { Component, OnInit} from '@angular/core';
import { NgxBarcodeModule } from 'ngx-barcode';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { HomeworkService } from '../../../services/homework.service';
import { Homework } from '../../../models/homework';

import {map} from 'rxjs/operators';

import { UserService } from '../../../services/user.service';
import { TareaUnidad } from '../../../models/tareaUnidad';
import { TareaUnidadService } from '../../../services/tarea-unidad.service';



@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css'],
  providers: [HomeworkService, TareaUnidadService]
})
export class BarcodeComponent implements OnInit {


	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
  private _homeworkService: HomeworkService,
  private tareaUnidadService: TareaUnidadService,

	) {
		this.title = 'Código de barras';
	 this.homework = new Homework('', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  this.tareaUnidad = new TareaUnidad('', '', '', '', '', '');
  this.codigo = [];


	}

  get values(): any[] {
    return this.value.split('\n');
  }

	public title: string;
  public homework: Homework;
  public tareaUnidad: TareaUnidad;
  public token;
  public codes;
  public codigo;

	PrintSerials = [{
	SerialId: 123
	}];

  elementType = 'svg';
  value = 'someValue12340987';
  format = 'CODE128';
  lineColor = '#000000';
  width = 1.5;
  height = 15;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 10;
  background = '#ffffff';
  margin = 10;
  marginTop = 1;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;
  codeList: string[] = [
    '', 'CODE128',
    'CODE128A', 'CODE128B', 'CODE128C',
    'UPC', 'EAN8', 'EAN5', 'EAN2',
    'CODE39',
    'ITF14',
    'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110',
    'pharmacode',
    'codabar'
  ];

	ngOnInit() {
    this.getHomework();
    this.getTareaUnidad();


  }


  getTareaUnidad() {
    var code = [];
    this.tareaUnidadService.getHomeworkUnit().subscribe(
      response => {
        this.tareaUnidad = response.tareaUnidad;
        // tslint:disable-next-line:forin
        for (var i of response.tareaUnidad) {

          this.codigo.push(i.code);
          console.log('tareaunidad', this.codigo);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }



	getHomework() {
		this._route.params.forEach((params: Params) => {
			const id = params.id;

			this._homeworkService.getHomework(id).subscribe(
				response => {
					if (!response.homework) {
						this._router.navigate(['admin-panel/listado-tareas']);
					} else {
						this.homework = response.homework;
      this.codes = new Array(
        this.homework.treintaytres + this.homework.treintaycuatro + this.homework.treintaycinco
         + this.homework.treintayseis + this.homework.treintaysiete + this.homework.treintayocho
         + this.homework.treintaynueve + this.homework.cuarenta + this.homework.cuarentayuno
         + this.homework.cuarentaydos + this.homework.cuarentaytres + this.homework.cuarentaycuatro
         + this.homework.cuarentaycinco + this.homework.cuarentayseis + this.homework.cuarentaysiete);  // this.homework.quantity

						// var arr = Object.keys(this.homework).map(key => ({type: key, value: this.homework[key]}));

					}
				},
				error => {
					console.log(error as any);
					this._router.navigate(['admin-panel/listado-tareas']);

				}
			);
		});
	}




//   print(): void {
//     let printContents, popupWin;
//     printContents = document.getElementById('print-section').innerHTML;
//     popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
//     popupWin.document.open();
//     popupWin.document.write(`
//       <html>
//         <head>
//           <title>Imprimir código de barras</title>
//           <style>
//           //........Customized style.......
//           </style>
//         </head>
//     <body onload="window.print();window.close()">${printContents}</body>
//       </html>`
//     );
//     popupWin.document.close();
// }

print() {
  
  const printContents = document.getElementById('print-section').innerHTML;
  const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <title>Imprimir código de barras</title>
        <style>

        </style>
      </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`
  );
  popupWin.document.close();
}

  imprimir() {
    const sec = document.getElementById('print-section').innerHTML;
    window.print();
  }


}
