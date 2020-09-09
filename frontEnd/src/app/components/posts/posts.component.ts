import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnChanges {
  @Input('posts') posts: Post[] = [];

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges() {
    console.log(this.posts);
  }
}
