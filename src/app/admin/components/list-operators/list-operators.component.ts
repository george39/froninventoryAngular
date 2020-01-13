import { Component, OnInit } from '@angular/core';
import { OperatorService } from '../../../services/operator.service';
import { Operator } from '../../../models/operator';

@Component({
  selector: 'app-list-operators',
  templateUrl: './list-operators.component.html',
  styleUrls: ['./list-operators.component.css']
})
export class ListOperatorsComponent implements OnInit {
  title = 'Lista de operarios';
  public operator: Operator[];

  constructor(
    private operatorService: OperatorService
  ) { }

  ngOnInit() {
    this.getOperator();
  }

  getOperator() {
    this.operatorService.getOperators().subscribe(
      response => {
        this.operator = response.operator;
        console.log('operario', this.operator);
      }
    );
  }

}
