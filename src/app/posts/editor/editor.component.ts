import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  post = new FormGroup({
    title: new FormControl('default title', Validators.required),
    body: new FormControl(null, [
      Validators.required,
      Validators.minLength(10)
    ]),
    tags: new FormArray([
      new FormControl('Angular'),
      new FormControl('HTML'),
      new FormControl('CSS')
    ]),
    seo: new FormGroup({
      meta: new FormControl('angular')
    })
  });

  get tags(): FormArray {
    return this.post.get('tags') as FormArray;
  }

  get title(): AbstractControl {
    return this.post.get('title');
  }

  get body(): AbstractControl {
    return this.post.get('body');
  }

  constructor(private postService: PostService) {}

  ngOnInit() {}

  addTag(tag) {
    if (tag) {
      this.tags.push(new FormControl(tag));
    }
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  createPost() {
    this.postService.createPost(this.post.value).subscribe(article => {
      console.log(article);
    });
  }
}
