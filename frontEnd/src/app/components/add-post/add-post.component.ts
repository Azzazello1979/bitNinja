import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  @Output() public userPosted = new EventEmitter<Post>();
  public postForm: FormGroup;
  constructor() {}

  onSubmitForm() {
    //console.log(this.commentForm.value.commentFormGroup.comment);
    this.userPosted.emit(this.postForm.value.commentFormGroup.comment);
  }

  ngOnInit(): void {
    // userId is input, id will be auto created @ backEnd
    this.postForm = new FormGroup({
      postFormGroup: new FormGroup({
        title: new FormControl(null, Validators.required),
        body: new FormControl(null, Validators.required),
      }),
    });
  }
}
