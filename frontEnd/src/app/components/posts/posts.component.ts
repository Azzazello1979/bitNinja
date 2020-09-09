import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PanelChangeEvent } from 'src/app/models/panelChangeEvent';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  @Input('posts') posts: Post[] = [];

  convertId(id: number): string {
    return `static-${id}`;
  }

  onPanelChange(event: PanelChangeEvent) {
    console.log(event);
  }
}
