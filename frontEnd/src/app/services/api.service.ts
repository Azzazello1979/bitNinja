import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post';
import { OutgoingPost } from 'src/app/models/outgoingPost';
import { Observable, BehaviorSubject } from 'rxjs';
import { Comment } from 'src/app/models/comment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private busy: boolean = false;
  private busyChanged = new BehaviorSubject<boolean>(this.busy);
  private currentUserId: number = 0;
  private currentPostId: number = 0;

  constructor(private http: HttpClient) {}

  setCurrentlySelectedPostData(currentlySelectedPostData: number[]) {
    this.currentUserId = currentlySelectedPostData[0];
    this.currentPostId = currentlySelectedPostData[1];
  }

  broadcastBusyStatus() {
    return this.busyChanged.asObservable();
  }

  toggleBusy() {
    this.busy = !this.busy;
    this.busyChanged.next(this.busy);
  }

  getPosts(): Observable<Post[]> {
    this.toggleBusy();
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  sendPost(partialBody: OutgoingPost) {
    this.toggleBusy();
    let body = { ...partialBody };
    body.userId = this.currentUserId;
    return this.http.post('https://jsonplaceholder.typicode.com/posts', body);
  }

  getComments(): Observable<Comment[]> {
    this.toggleBusy();
    return this.http.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/posts/${this.currentPostId}/comments`
    );
  }
}
