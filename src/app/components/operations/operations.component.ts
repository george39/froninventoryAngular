import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
  providers: [UserService]
})
export class OperationsComponent implements OnInit {
	public title: string;
	public user: User;
	

  constructor() { }

  ngOnInit() {
  }

}
