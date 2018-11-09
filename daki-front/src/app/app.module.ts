import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { NgxMaskModule } from "ngx-mask";
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { StoreModule } from '@ngrx/store';
import { authReducer } from "./store/reducers/auth.reducer";

const appRoutes: Routes = [
  // { path: '', component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },

  { path: "**", redirectTo: "" }
];
@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgxMaskModule.forRoot(),
    NgxViacepModule,
    StoreModule.forRoot({
      auth: authReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
