import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { PostItemComponent } from './post-item/post-item.component';
import { PostListComponent } from './post-list/post-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostFormComponent } from './post-form/post-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { TimelineComponent } from './timeline/timeline.component';

const appRoutes: Routes = [{
  path: '', component: HomeComponent,
}, {
  path: 'register', component: RegisterComponent
}, {
  path: 'login', component: LoginComponent
}, {
  path: 'menu', component: UserMenuComponent
}, {
  path: 'profile', component: UserProfileComponent
}, {
  path: 'posts', component: PostListComponent
}, {
  path: 'posts/add', component: PostFormComponent
}];


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    PostItemComponent,
    PostListComponent,
    PostFormComponent,
    UserProfileComponent,
    UserMenuComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
