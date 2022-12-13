import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderlogComponent } from './components/headerlog/headerlog.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HeaderlogComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],exports:[
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HeaderlogComponent
  ]
})
export class SharedModule { }
