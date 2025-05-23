import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-outer">
      <div class="login-card">
        <ng-container *ngIf="!showRegister; else registerBlock">
          <h2>Login</h2>
          <form #loginForm="ngForm" (ngSubmit)="login(loginForm)" autocomplete="off">
            <div>
              <label for="username">Username</label>
              <input [(ngModel)]="username" id="username" name="username" placeholder="Username" required />
            </div>
            <div>
              <label for="password">Password</label>
              <input [(ngModel)]="password" id="password" name="password" type="password" placeholder="Password" required />
            </div>
            <button type="submit" [disabled]="loginForm.invalid">Login</button>
            <div *ngIf="error" class="error-msg">{{error}}</div>
          </form>
          <button style="margin:18px auto 0 auto;display:block;" (click)="showRegister = true">Register</button>
        </ng-container>
        <ng-template #registerBlock>
          <h2>Register</h2>
          <form #registerForm="ngForm" (ngSubmit)="register(registerForm)" autocomplete="off">
            <div>
              <label for="regUsername">Username</label>
              <input [(ngModel)]="regUsername" id="regUsername" name="regUsername" placeholder="Username" required />
            </div>
            <div>
              <label for="regPassword">Password</label>
              <input [(ngModel)]="regPassword" id="regPassword" name="regPassword" type="password" placeholder="Password" required />
            </div>
            <button type="submit" [disabled]="registerForm.invalid">Register</button>
            <button type="button" style="margin-left:12px" (click)="showRegister = false">Back to Login</button>
            <div *ngIf="regError" class="error-msg">{{regError}}</div>
            <div *ngIf="regMsg" class="success-msg">{{regMsg}}</div>
          </form>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  regUsername = '';
  regPassword = '';
  regMsg = '';
  regError = '';

  showRegister = false;

  constructor(private commentService: CommentService, private router: Router) {}

  login(form: NgForm) {
    this.error = '';
    if (form.invalid) {
      this.error = 'Invalid login';
      return;
    }
    this.commentService.login(this.username, this.password).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', this.username);
        alert(`${this.username} successfully logged in!`);
        this.router.navigate(['/comments']);
      },
      error: () => this.error = 'Invalid login'
    });
  }

  register(form: NgForm) {
    this.regMsg = '';
    this.regError = '';
    if (form.invalid) {
      this.regError = 'Please fill all fields';
      return;
    }
    this.commentService.register(this.regUsername, this.regPassword).subscribe({
      next: () => {
        this.regMsg = 'Registration successful! You can now log in.';
        this.regUsername = '';
        this.regPassword = '';
        setTimeout(() => {
          this.showRegister = false;
          this.regMsg = '';
        }, 1200);
      },
      error: err => {
        this.regError = err.error?.detail || 'Registration failed';
      }
    });
  }
}