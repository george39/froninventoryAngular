import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';


// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HomeworkComponent } from './components/homework/homework.component';
import { Warehouse1Component } from './components/warehouse1/warehouse1.component';
import { Warehouse2Component } from './components/warehouse2/warehouse2.component';
import { Injection1Component } from './components/injection1/injection1.component';
import { Injection2Component } from './components/injection2/injection2.component';
import { GuarnecidaComponent } from './components/guarnecida/guarnecida.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';




// Importar nuestro nuevo modulo
import { AdminModule } from './admin/admin.module';
import { OperationsComponent } from './components/operations/operations.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AddReferenceComponent } from './components/add-reference/add-reference.component';
import { HomeworkDetailComponent } from './components/homework-detail/homework-detail.component';
import { SearchPipe } from '../pipes/search.pipe';
import { AddTareaUnidadComponent } from './admin/components/add-tarea-unidad/add-tarea-unidad.component';


@NgModule({
  declarations: [
    AppComponent,   
    HomeComponent,
    HomeworkComponent,
    Warehouse1Component,
    Warehouse2Component,
    Injection1Component,
    Injection2Component,
    GuarnecidaComponent,
    RegisterComponent,
    LoginComponent,
    OperationsComponent,
    UserEditComponent,
    AddReferenceComponent,
    HomeworkDetailComponent,
    SearchPipe,
    
    
     
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    AdminModule

  ],
  providers: [
  	appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
