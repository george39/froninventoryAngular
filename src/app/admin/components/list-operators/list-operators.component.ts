import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-operators',
  templateUrl: './list-operators.component.html',
  styleUrls: ['./list-operators.component.css']
})
export class ListOperatorsComponent implements OnInit {
	title = 'Lista de operarios'

  constructor() { }

  ngOnInit() {
  }

}
