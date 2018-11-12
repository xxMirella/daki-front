import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// import { PostItemComponent } from './post-item/post-item.component';
// import { PostListComponent } from './post-list/post-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PostFormComponent } from './post-form/post-form.component';
import { CardComponent } from './card/card.component';
import { CardsListComponent } from './cards/cards.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardDetailsComponent } from './card-details/card-details.component';

const appRoutes: Routes = [
  // { path: 'posts', component: PostListComponent },
  // { path: 'posts/add', component: PostFormComponent },
  { path: '', component: CardsListComponent },
  { path: 'post/:id', component: CardDetailsComponent, data:{postData: {}} },
]

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardsListComponent,
    CardDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
