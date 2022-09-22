import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/data-access/login.service';
import { Post, PostService } from 'src/app/data-access/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnDestroy {
  private addSubscription = Subscription.EMPTY;

  createPostForm = this.fb.group({
    title: this.fb.control<string | null>(null, Validators.required),
    content: this.fb.control<string | null>(null, Validators.required),
    userId: this.fb.control<string | null>(
      this.userService.currentUser?.id ?? null,
      Validators.required
    ),
    createAt: this.fb.control<Date | null>(null, Validators.required),
  });

  get createAt() {
    return this.createPostForm.get('createAt');
  }

  get title() {
    return this.createPostForm.get('title');
  }

  get content() {
    return this.createPostForm.get('content');
  }

  constructor(
    private postService: PostService,
    private router: Router,
    private fb: FormBuilder,
    private userService: LoginService
  ) {}

  ngOnDestroy(): void {
    this.addSubscription.unsubscribe;
  }

  addPost(): void {
    this.createAt?.setValue(new Date());

    if (this.createPostForm.invalid) {
      return this.createPostForm.markAllAsTouched();
    }

    const post = this.createPostForm.value as Omit<Post, 'id'>;
    this.addSubscription = this.postService.addPost(post).subscribe({
      next: () => this.router.navigate(['/posts']),
      error: (response) => {
        console.error(response);
        alert('Something went wrong!');
      },
    });
  }
}
