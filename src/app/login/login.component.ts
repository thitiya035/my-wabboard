import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../data-access/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private loginSubscription = Subscription.EMPTY;

  readonly id = new FormControl<string | null>(null, Validators.required);

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe;
  }

  login(): void {
    if (this.id.invalid) {
      return this.id.markAsTouched();
    }

    this.loginSubscription.unsubscribe;
    this.loginSubscription = this.loginService
      .login(this.id.value as string)
      .subscribe({
        next: (user) => {
          this.loginService.currentUser = user;
          this.id.reset();
          this.router.navigate(['/posts']);
        },
        error: (respones) => {
          console.log(respones);
          alert('Something went wrong!');
        },
      });
  }
}
