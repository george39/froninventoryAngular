import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { AddReferenceComponent } from './components/add-reference/add-reference.component';
import { AddHomeworkComponent } from './components/add-homework/add-homework.component';
import { ListOperatorsComponent } from './components/list-operators/list-operators.component';
import { AdminGuard } from '../services/admin.guard';
import { RegisterComponent } from '../components/register/register.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { HomeworkDetailComponent } from './components/homework-detail/homework-detail.component';
import { HomeworkEditComponent } from './components/homework-edit/homework-edit.component';
import { AddWarehouse1Component } from './components/add-warehouse1/add-warehouse1.component';
import { ListWarehouse1Component } from './components/list-warehouse1/list-warehouse1.component';
import { EnsayoComponent } from './components/ensayo/ensayo.component';
import { Ensayo3Component } from './components/ensayo3/ensayo3.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { AddTareaUnidadComponent } from './components/add-tarea-unidad/add-tarea-unidad.component';

import { EntradasComponent } from './components/guarnecida/entradas.component';
import { SalidasComponent } from './components/guarnecida/salidas.component';
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
import { UpdateReferenceComponent } from './components/warehouse2/update-reference.component';
import { StockComponent } from './components/warehouse2/stock.component';
import { StockWarehouse1Component } from './components/warehouse1/stock-warehouse1.component';
import { StockGuarnecidaComponent } from './components/guarnecida/stock-guarnecida.component';


const adminRoutes: Routes = [
	{
		path: 'admin-panel',
		component: MainComponent,
		canActivate: [AdminGuard],		
		children: [
			{path: '', redirectTo: 'home', pathMatch: 'full'},
			{path: 'listado-tareas', component: ListComponent},
			{path: 'crear-operario', component: RegisterComponent},
			{path: 'editar', component: EditComponent},
			{path: 'crear-referencia', component: AddReferenceComponent},
			{path: 'crear-tarea', component: AddHomeworkComponent},
			{path: 'listado-operarios', component: ListOperatorsComponent},
			{path: 'codigo-barras/:id', component: BarcodeComponent},
			{path: 'detalles-tarea/:id', component: HomeworkDetailComponent},
			{path: 'detalles-terminado/:id', component: DetailTerminationComponent},
			{path: 'editar-tarea/:id', component: HomeworkEditComponent},
			{path: 'insertar-registro', component: AddWarehouse1Component},
			{path: 'lista-registro', component: ListWarehouse1Component},
			{path: 'agregar-registro', component: EnsayoComponent},
			{path: 'ingresos-almacen1', component: EntradasWarehouse1Component},
			{path: 'salidas-almacen1', component: SalidasWarehouse1Component},
			{path: 'listado-almacen1', component: StockWarehouse1Component},
			{path: 'salidas-almacen2', component: SalidasWarehouse2Component},
			{path: 'ingresos-almacen2', component: EntradasWarehouse2Component},
			{path: 'listado-almacen2', component: StockComponent},
			{path: 'editar-referencia-almacen2', component: UpdateReferenceComponent},
			{path: 'ensayo3', component: Ensayo3Component},
			{path: 'tarea-unidad', component: AddTareaUnidadComponent},
			{path: 'addguarnecida', component: EntradasComponent},
			{path: 'salidas-guarnecida', component: SalidasGuarnecidaComponent},
			{path: 'listado-guarnecida', component: StockGuarnecidaComponent},
			{path: 'strobell-inyeccion', component: SalidasStrobellComponent},
			{path: 'ojaleteado-strobell', component: SalidasOjaleteadoComponent},
			{path: 'asignar-tarea-guarnecida', component: AsignarTareaComponent},
			{path: 'busqueda/:termino', component: BusquedaComponent},
			{path: 'busqueda/:termino/:todo', component: BusquedaComponent},
			{path: 'vales-terminado', component: ValeTerminadoComponent},

		]
	}

	
];

@NgModule({
	imports: [
		RouterModule.forChild(adminRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AdminRoutingModule { }