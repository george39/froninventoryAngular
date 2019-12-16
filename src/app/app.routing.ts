import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { AppComponent } from './app.component';
import { GuarnecidaComponent } from './components/guarnecida/guarnecida.component';
import { HomeComponent } from './components/home/home.component';
import { HomeworkComponent } from './components/homework/homework.component';
import { Injection1Component } from './components/injection1/injection1.component';
import { Injection2Component } from './components/injection2/injection2.component';
import { Warehouse1Component } from './components/warehouse1/warehouse1.component';
import { Warehouse2Component } from './components/warehouse2/warehouse2.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { HomeworkDetailComponent } from './components/homework-detail/homework-detail.component';
import { BusquedaComponent } from './admin/components/busqueda/busqueda.component';
import { StockGuarnecidaInternaComponent } from './components/guarnecida/stock-guarnecida-interna.component';
import { StockGuarnecidaExternaComponent } from './components/guarnecidaExterna/stock-guarnecida-externa.component';
import { StockTroqueladoComponent } from './admin/components/add-homework/stock-troquelado.component';
import { StockStrobellComponent } from './components/strobell/stock-strobell/stock-strobell.component';
import { StockOjaleteadoComponent } from './admin/components/ojaleteado/stock-ojaleteado.component';
import { StockWarehouse1Component } from './admin/components/warehouse1/stock-warehouse1.component';
import { StockWarehouse2Component } from './components/warehouse2/stock-warehouse2.component';
import { StockTerminationComponent } from './admin/components/termination/stock-termination.component';
import { StockInjectionComponent } from './admin/components/injection/stock-injection.component';
import { TrazabilidadComponent } from './components/trazabilidad/trazabilidad.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'listado-guarnecida-interna', component: StockGuarnecidaInternaComponent},
	{path: 'listado-guarnecida-externa', component: StockGuarnecidaExternaComponent},
	{path: 'listado-troquelado', component: StockTroqueladoComponent},
	{path: 'listado-strobell', component: StockStrobellComponent},
	{path: 'listado-ojaleteado', component: StockOjaleteadoComponent},
	{path: 'listado-almacen1', component: StockWarehouse1Component},
	{path: 'listado-almacen2', component: StockWarehouse2Component},
	{path: 'listado-terminado', component: StockTerminationComponent},
	{path: 'listado-inyeccion', component: StockInjectionComponent},
	{path: 'tareas', component: HomeworkComponent},
	{path: 'inyeccion1', component: Injection1Component},
	{path: 'inyeccion2', component: Injection2Component},
	{path: 'almacen1', component: Warehouse1Component},
	{path: 'almacen2', component: Warehouse2Component},
	{path: 'login', component: LoginComponent},
	{path: 'registro', component: RegisterComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: 'detalles-tarea/:id', component: HomeworkDetailComponent},
	{path: 'trazabilidad', component: TrazabilidadComponent},
	{path: 'busqueda/:termino', component: BusquedaComponent},
	{path: '**', component: HomeComponent}
	
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);