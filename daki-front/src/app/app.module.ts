import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PostItemComponent } from './post-item/post-item.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/add', component: PostFormComponent },
  { path: 'error', component: ErrorComponent },

  { path: '**', redirectTo: '' }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PostItemComponent,
    PostListComponent,
    PostFormComponent,
    ErrorComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxViacepModule,
    StoreModule.forRoot({
      auth: authReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
