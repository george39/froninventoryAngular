import { Component, OnInit } from '@angular/core';
import { Warehouse1 } from '../../../models/warehouse1';
import { Warehouse1Service } from '../../../services/warehouse1.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ensayo3',
  templateUrl: './ensayo3.component.html',
  styleUrls: ['./ensayo3.component.css']
})
export class Ensayo3Component implements OnInit {
	public warehouse1: Array<Warehouse1>;
	public token;


  constructor(
    // tslint:disable-next-line:variable-name
		private _warehouse1Service: Warehouse1Service,
		private router: Router
  ) {
   }

  ngOnInit() {
	}

	buscar(termino: string) {
		this.router.navigate(['/admin-panel/busqueda', termino]);
	}

}
