import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarClienteRoutingModule } from './registrar-cliente-routing.module';
import { RegistrarClienteComponent } from './pages/registrar-cliente/registrar-cliente.component';


@NgModule({
  declarations: [
    RegistrarClienteComponent
  ],
  imports: [
    CommonModule,
    RegistrarClienteRoutingModule
  ],
  exports:[
    RegistrarClienteComponent
  ]
})
export class RegistrarClienteModule { }
