import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesContainerComponent } from './courses-container/courses-container.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { CourseComponent } from './course/course.component';

@NgModule({
  declarations: [CoursesContainerComponent, CourseComponent],
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [CoursesContainerComponent],
})
export class CoursesModule {}
