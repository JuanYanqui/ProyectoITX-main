import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    loadChildren:() => import("./homepage/homepage.module").then(m => m.HomepageModule)
  },
  {
    path:'log',
    loadChildren:() => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path:'reg-user',
    loadChildren:() => import("./register-user/register-user.module").then(m => m.RegisterUserModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
