import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegUserComponent } from './pages/reg-user/reg-user.component';
import { RegisterUserModule } from './register-user.module';

const routes: Routes = [
  {
    path:'',
    component: RegUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterUserRoutingModule { }
