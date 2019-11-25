import { Component, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { ValeTerminacionService } from '../../../services/vale-terminacion.service';
import { ValeTerminado } from '../../../models/valeTerminado';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-detail-termination',
  templateUrl: './detail-termination.component.html',
  styles: []
})
export class DetailTerminationComponent implements OnInit, DoCheck {

  public valeTermination: ValeTerminado[];
  public a;
  @ViewChild('referencia') referencia: ElementRef;
  canasta: string = null;
 

  public reference: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private valetermiationService: ValeTerminacionService
  ) {
    this.reference = new Array();
    
   }

  ngOnInit() {

    this.getVateTermination();
  }
  
  ngDoCheck() {
  }
  
  
  getVateTermination() {
    this.route.params.forEach((params: Params) => {
      const id = params.id;
      
      this.valetermiationService.getValeTerminado(id).subscribe(
        response => {
          if (!response.valeTermination) {
            this.router.navigate(['/']);
          } else {
            this.valeTermination = response.valeTermination;
            // this.reference.push(this.referencia.nativeElement.value);
            var az = document.getElementById('referencia').innerHTML;
            console.log('a', az);
            
          }
        },
        error => {
          console.log(error as any);
        }
        );
      });
    }
    
    actualizar() {
      this.reference.push(this.referencia.nativeElement.value);
      console.log('a', this.reference);

  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Imprimir</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
