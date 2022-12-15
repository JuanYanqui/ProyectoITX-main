import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'registrar-cliente',
    loadChildren:() => import("./registrar-cliente/registrar-cliente.module").then(m => m.RegistrarClienteModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
