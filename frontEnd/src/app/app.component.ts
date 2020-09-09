import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Post } from './models/post';
import { OutgoingPost } from 'src/app/models/outgoingPost';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  posts: Post[] = [];
  title = 'Bit Ninja App';
  currentUserId: number = 0;
  currentPostId: number = 101; // for posting new posts, the response id is always 101, this would casuse problems when displaying posts

  constructor(private apiService: ApiService) {}

  onUserPost(newPost: OutgoingPost) {
    //console.log(newPost);
    this.apiService.sendPost(newPost).subscribe(
      (response: Post) => {
        response.id = this.currentPostId++;
        this.posts.unshift(response);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onUserIdChange(userId: number) {
    this.currentUserId = userId;
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
