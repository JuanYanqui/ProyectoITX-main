import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SharedModule } from 'primeng/api';


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule
   
  ],
  exports:[
    HomepageComponent
  ]
})
export class HomepageModule { }
