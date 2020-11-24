import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';


@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule
  ]
})
export class ProjectModule { }
