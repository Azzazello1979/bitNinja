import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Post } from './models/post';
import { OutgoingPost } from 'src/app/models/outgoingPost';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  busy: boolean = false;
  posts: Post[] = [];
  currentUserId: number = 0;
  currentPostId: number = 101; // for posting new posts, the response id is always 101, this would casuse problems when displaying posts
  comments: Comment[] = [];

  constructor(private apiService: ApiService) {}

  clearComments() {
    this.comments = [];
  }

  onUserPost(newPost: OutgoingPost) {
    //console.log(newPost);
    this.apiService.sendPost(newPost).subscribe(
      (response: Post) => {
        response.id = this.currentPostId++;
        this.posts.unshift(response);
        this.apiService.toggleBusy();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCurrentlySelectedPostChanged(currentlySelectedPostData: number[]) {
    this.currentUserId = currentlySelectedPostData[0];
    this.apiService.setCurrentlySelectedPostData(currentlySelectedPostData);
  }

  onCheckCommentButtonClicked() {
    this.apiService.getComments().subscribe(
      (comments) => {
        console.log(comments);
        this.comments = [...comments];
        this.apiService.toggleBusy();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  bringPosts() {
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

  ngOnInit() {
    this.bringPosts();
    this.apiService.broadcastBusyStatus().subscribe((busyStatus) => {
      this.busy = busyStatus;
      console.log(this.busy);
    });
  }
}
