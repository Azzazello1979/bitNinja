import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OutgoingPost } from 'src/app/models/outgoingPost';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  @Output() public userPosted = new EventEmitter<OutgoingPost>();
  @Input('currentUserId') currentUserId: number = 0;
  public postForm: FormGroup;
  constructor() {}

  onSubmitForm() {
    //console.log(this.postForm.value.postFormGroup);
    this.userPosted.emit(this.postForm.value.postFormGroup);
    this.postForm.reset();
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
