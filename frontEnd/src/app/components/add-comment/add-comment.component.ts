import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent implements OnInit {
  public commentForm: FormGroup;
  constructor() {}

  onSubmitForm() {
    console.log(this.commentForm);
  }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      commentFormGroup: new FormGroup({
        comment: new FormControl(null, Validators.required),
      }),
    });
  }
}
