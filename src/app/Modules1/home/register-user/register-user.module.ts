import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import { RegUserComponent } from './pages/reg-user/reg-user.component';


@NgModule({
  declarations: [
    RegUserComponent
  ],
  imports: [
    CommonModule,
    RegisterUserRoutingModule
  ]
})
export class RegisterUserModule { }
