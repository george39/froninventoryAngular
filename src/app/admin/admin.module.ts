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
import { DinamicaPipe } from './pipes/dinamica.pipe';


// Componentes
import { MainComponent } from './components/main/main.component';
import { ListOperatorsComponent } from './components/list-operators/list-operators.component';
import { AddReferenceComponent } from './components/add-reference/add-reference.component';
import { AddHomeworkComponent } from './components/add-homework/add-homework.component';
import { AdminComponent } from './admin.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { HomeworkDetailComponent } from './components/homework-detail/homework-detail.component';
import { HomeworkEditComponent } from './components/homework-edit/homework-edit.component';
import { Warehouse1Service } from '../services/warehouse1.service';
import { BrowserModule } from '@angular/platform-browser';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { IngresosWarehouse1Pipe } from './pipes/ingresos-warehouse1.pipe';
import { AddTareaUnidadComponent } from './components/add-tarea-unidad/add-tarea-unidad.component';
import { EntradasGuarnecidaComponent } from './components/guarnecida/entradas-guarnecida.component';
import { AsignarTareaComponent } from './components/guarnecida/asignar-tarea.component';
import { EntradasWarehouse1Component } from './components/warehouse1/entradas-warehouse1.component';
import { SalidasWarehouse1Component } from './components/warehouse1/salidas-warehouse1.component';
import { EntradasWarehouse2Component } from './components/warehouse2/entradas-warehouse2.component';
import { SalidasWarehouse2Component } from './components/warehouse2/salidas-warehouse2.component';
import { SalidasStrobellComponent } from './components/strobell/salidas-strobell.component';
import { SalidasOjaleteadoComponent } from './components/ojaleteado/salidas-ojaleteado.component';
import { SalidasGuarnecidaComponent } from './components/guarnecida/salidas-guarnecida.component';
import { ValeTerminadoComponent } from './components/warehouse2/vale-terminado.component';
import { DetailTerminationComponent } from './components/termination/detail-termination.component';
import { SearchIdPipe } from './pipes/search-id.pipe';
import { UpdateReferenceComponent } from './components/warehouse2/update-reference.component';
import { StockComponent } from './components/warehouse2/stock.component';
import { ConsolidarPipe } from './pipes/consolidar.pipe';
import { StockWarehouse1Component } from './components/warehouse1/stock-warehouse1.component';
import { StockGuarnecidaComponent } from './components/guarnecida/stock-guarnecida.component';
import { StockTroqueladoComponent } from './components/add-homework/stock-troquelado.component';
import { EnsayoPipe } from './pipes/ensayo.pipe';
import { StockOjaleteadoComponent } from './components/ojaleteado/stock-ojaleteado.component';
import { StockStrobelComponent } from './components/strobell/stock-strobel.component';
import { StockInjectionComponent } from './components/injection/stock-injection.component';
import { StockTerminationComponent } from './components/termination/stock-termination.component';
import { SearchReferencePipe } from './pipes/search-reference.pipe';
import { SalidasVulcanizadoComponent } from './components/vulcanizado/salidas-vulcanizado.component';
import { EntradasVulcanizadoComponent } from './components/vulcanizado/entradas-vulcanizado.component';
import { ListadoTareasComponent } from './components/add-homework/listado-tareas.component';
import { OperatorComponent } from './components/addOperator/operator.component';





@NgModule({
	declarations: [
		MainComponent,
		ListOperatorsComponent,
		AddReferenceComponent,
		AddHomeworkComponent,
		AdminComponent,
		BarcodeComponent,
		HomeworkDetailComponent,
		HomeworkEditComponent,
		SearchPipe,
		BarcodeWarehouse1,
		RegisterPipe,
		BusquedaComponent,
		IngresosWarehouse1Pipe,
		AddTareaUnidadComponent,
		DinamicaPipe,
		EntradasGuarnecidaComponent,
		AsignarTareaComponent,
		EntradasWarehouse1Component,
		SalidasWarehouse1Component,
		EntradasWarehouse2Component,
		SalidasWarehouse2Component,
		SalidasStrobellComponent,
		SalidasOjaleteadoComponent,
		SalidasGuarnecidaComponent,
		ValeTerminadoComponent,
		DetailTerminationComponent,
		SearchIdPipe,
		UpdateReferenceComponent,
		StockComponent,
		ConsolidarPipe,
		StockWarehouse1Component,
		StockGuarnecidaComponent,
		StockTroqueladoComponent,
		EnsayoPipe,
		StockOjaleteadoComponent,
		StockStrobelComponent,
		StockInjectionComponent,
		StockTerminationComponent,
		SearchReferencePipe,
		SalidasVulcanizadoComponent,
		EntradasVulcanizadoComponent,
		ListadoTareasComponent,
		OperatorComponent
		
		
		
		
		
		
		
		
		
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
		FormsModule,
		
		
	],
	exports:[
		MainComponent,
		
	],
	providers: [
		UserService,
		AdminGuard,
		Warehouse1Service,
	]
})

export class AdminModule {}