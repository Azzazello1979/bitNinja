import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from './services/api.service';
import { Post } from './models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Output() posts: Post[] = [];
  title = 'Bit Ninja';
  constructor(private apiService: ApiService) {}

  onUserComment(newPost: Post) {
    console.log(newPost);
    this.apiService.sendPost(newPost);
  }

  ngOnInit() {
    this.apiService.getPosts().subscribe(
      (posts) => {
        //console.log(posts);
        this.posts = [...posts];
        this.apiService.toggleBusy();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
