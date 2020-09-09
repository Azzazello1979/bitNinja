import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post';
import { OutgoingPost } from 'src/app/models/outgoingPost';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private busy: boolean = false;
  private currentUserId: number = 0;
  private currentPostId: number = 0;

  constructor(private http: HttpClient) {}

  setCurrentlySelectedPostData(currentlySelectedPostData: number[]) {
    this.currentUserId = currentlySelectedPostData[0];
    this.currentPostId = currentlySelectedPostData[1];
    console.log(this.currentPostId);
  }

  toggleBusy() {
    this.busy = !this.busy;
  }

  getPosts(): Observable<Post[]> {
    this.busy = true;
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  sendPost(partialBody: OutgoingPost) {
    this.busy = true;
    let body = { ...partialBody };
    body.userId = this.currentUserId;
    //console.log('outgoing post is: ', body);
    return this.http.post('https://jsonplaceholder.typicode.com/posts', body);
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/posts/${this.currentPostId}/comments`
    );
  }
}
