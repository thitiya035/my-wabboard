import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateModule } from '../date/date.module';

@NgModule({
  declarations: [PostListComponent, CreatePostComponent],
  imports: [CommonModule, PostRoutingModule, ReactiveFormsModule, DateModule],
})
export class PostModule {}
