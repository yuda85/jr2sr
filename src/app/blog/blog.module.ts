import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogContainerComponent } from './blog-container/blog-container.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [BlogContainerComponent, PostComponent],
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [BlogContainerComponent],
})
export class BlogModule {}
