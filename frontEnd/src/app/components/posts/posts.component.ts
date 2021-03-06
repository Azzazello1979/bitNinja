import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PanelChangeEvent } from 'src/app/models/panelChangeEvent';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  @Input('posts') posts: Post[] = [];
  @Output() selectedPostChanged = new EventEmitter<number[]>();
  @Output() checkCommentsButtonClicked = new EventEmitter();

  convertId(postId: number): string {
    return `static-${postId}`;
  }

  onCheckCommentsClick() {
    this.checkCommentsButtonClicked.emit();
  }

  // as user clicks on a post
  passCurrentlySelectedPostData(event: PanelChangeEvent) {
    let postId: number = parseInt(event.panelId.slice(7, event.panelId.length));
    let userId: number = 0;
    this.posts.forEach((post) => {
      post.id === postId ? (userId = post.userId) : null;
    });
    return this.selectedPostChanged.emit([userId, postId]);
  }
}
