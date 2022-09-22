import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { Comment, CommentService } from 'src/app/data-access/comment.service';
import { LoginService } from 'src/app/data-access/login.service';
import { Post, PostService } from 'src/app/data-access/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnDestroy {
  private addCommentSubscription = Subscription.EMPTY;
  isShowPostDatail = false;
  postDetail?: Post;

  readonly post$: Observable<Post[]> = this.postService.getPosts().pipe(
    catchError((response) => {
      console.error(response);
      alert('Something went wrong!');
      return of([]);
    })
  );

  readonly comment$: Observable<Comment[]> = this.commentService.getComment().pipe(
    catchError((response) => {
      console.error(response);
      alert('Something went wrong!');
      return of([]);
    })
  )

  commentForm = this.fb.group({
    postId: this.fb.control<number | null>(null, Validators.required),
    userID: this.fb.control<string | null>(
      this.userService.currentUser?.id ?? null,
      Validators.required
    ),
    comment: this.fb.control<string | null>(null, Validators.required),
    createAt: this.fb.control<Date | null>(null, Validators.required),
  });

  get createAt() {
    return this.commentForm.get('createAt');
  }

  constructor(
    private postService: PostService,
    private router: Router,
    private fb: FormBuilder,
    private userService: LoginService,
    private commentService: CommentService
  ) {}
  ngOnDestroy(): void {
    this.addCommentSubscription.unsubscribe();
  }

  addPost(): void {
    this.router.navigate(['/posts/create']);
  }

  view(post: Post): void {
    this.isShowPostDatail = true;
    this.postDetail = post;

  }

  addComment(): void {
    this.createAt?.setValue(new Date());

    if (this.commentForm.invalid) {
      return this.commentForm.markAllAsTouched();
    }

    const comment = this.commentForm.value as Comment;
    // this.addCommentSubscription = this.commentService.addComment(comment).subscribe({
    //   next:()=>{

    //   }
    // })
  }
}
