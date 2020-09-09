import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from './services/api.service';
import { Post } from './models/post';
import { OutgoingPost } from 'src/app/models/outgoingPost';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Output() posts: Post[] = [];
  title = 'Bit Ninja App';
  constructor(private apiService: ApiService) {}

  onUserPost(newPost: OutgoingPost) {
    console.log(newPost);
    this.apiService.sendPost(newPost);
  }

  onUserIdChange(userId: number) {
    this.apiService.setCurrentUserId(userId);
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
