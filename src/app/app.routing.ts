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

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'guarnecida', component: GuarnecidaComponent},
	{path: 'tareas', component: HomeworkComponent},
	{path: 'inyeccion1', component: Injection1Component},
	{path: 'inyeccion2', component: Injection2Component},
	{path: 'almacen1', component: Warehouse1Component},
	{path: 'almacen2', component: Warehouse2Component},
	{path: 'login', component: LoginComponent},
	{path: 'registro', component: RegisterComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: 'detalles-tarea/:id', component: HomeworkDetailComponent},
	{path: 'busqueda/:termino', component: BusquedaComponent},
	{path: '**', component: HomeComponent}
	
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);