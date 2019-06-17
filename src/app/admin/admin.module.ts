//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
// import 'angular-barcode';
import { NgxBarcodeModule } from 'ngx-barcode';


// servicios
import { UserService } from '../services/user.service';
import { AdminGuard } from '../services/admin.guard';
import { SearchPipe } from './pipes/search.pipe';
import { RegisterPipe } from './pipes/register.pipe';
import { BarcodeWarehouse1 } from './pipes/barcodewarehouse1.pipe';


// Componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { ListOperatorsComponent } from './components/list-operators/list-operators.component';
import { AddReferenceComponent } from './components/add-reference/add-reference.component';
import { AddHomeworkComponent } from './components/add-homework/add-homework.component';
import { AdminComponent } from './admin.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { HomeworkDetailComponent } from './components/homework-detail/homework-detail.component';
import { HomeworkEditComponent } from './components/homework-edit/homework-edit.component';
import { AddWarehouse1Component } from './components/add-warehouse1/add-warehouse1.component';
import { ListWarehouse1Component } from './components/list-warehouse1/list-warehouse1.component';
import { EnsayoComponent } from './components/ensayo/ensayo.component';
import { Warehouse1Service } from '../services/warehouse1.service';
import { BrowserModule } from '@angular/platform-browser';
import { Ensayo2Component } from './components/ensayo2/ensayo2.component';
import { Ensayo3Component } from './components/ensayo3/ensayo3.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { Ensayo2Pipe } from './pipes/ensayo2.pipe';




@NgModule({
	declarations: [
		MainComponent,
		ListComponent,
		AddComponent,
		EditComponent,		
		ListOperatorsComponent,
		AddReferenceComponent,
		AddHomeworkComponent,
		AdminComponent,
		BarcodeComponent,
		HomeworkDetailComponent,
		HomeworkEditComponent,
		SearchPipe,
		BarcodeWarehouse1,
		AddWarehouse1Component,
		ListWarehouse1Component,
		EnsayoComponent,
		Ensayo2Component,
		Ensayo3Component,
		RegisterPipe,
		BusquedaComponent,
		Ensayo2Pipe
		
		
		
		
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AdminRoutingModule,
		NgxBarcodeModule,
		 ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
		BrowserModule,
		ReactiveFormsModule,
		FormsModule 
		
	],
	exports:[
		MainComponent,
		ListComponent,
		AddComponent,
		EditComponent
	],
	providers: [
		UserService,
		AdminGuard,
		Warehouse1Service
	]
})

export class AdminModule {}