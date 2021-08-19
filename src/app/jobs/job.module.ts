import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobComponent } from './components/job/job.component';
import { JobsContainerComponent } from './jobs-container/jobs-container.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    JobComponent,
    JobsContainerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [JobsContainerComponent]
})
export class JobModule { }
