import { Component, OnInit } from '@angular/core';
import { Warehouse2Service } from '../../services/warehouse2.service';
import { Warehouse2 } from '../../models/warehouse2';


@Component({
  selector: 'app-warehouse2',
  templateUrl: './warehouse2.component.html',
  styleUrls: ['./warehouse2.component.css']
})
export class Warehouse2Component implements OnInit {
  public title;
  public warehouse2: Warehouse2[];

  constructor(
    private warehouse2Service: Warehouse2Service,
    
  ) { }

  ngOnInit() {
  }

  getWarehouse2() {
    
  }

}
