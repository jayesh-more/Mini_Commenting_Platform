import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CommentsComponent } from './comments/comments.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: LoginComponent },
      { path: 'comments', component: CommentsComponent }
    ]),
    provideHttpClient()
  ]
};