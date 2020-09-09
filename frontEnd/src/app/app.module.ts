import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from 'src/app/app.component';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { AddPostComponent } from 'src/app/components/add-post/add-post.component';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { ApiService } from 'src/app/services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    AddPostComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
