import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './../models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private busy: boolean = false;

  constructor(private http: HttpClient) {}

  toggleBusy() {
    this.busy = !this.busy;
  }

  getPosts(): Observable<Post[]> {
    this.busy = true;
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  sendPost(body: Post) {
    /* return this.http.post<Post>(
      'https://jsonplaceholder.typicode.com/posts',
      body
    ); */
  }
}
