import { Component, OnInit, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Router, NavigationExtras } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/reducers/auth.reducer';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsListComponent implements OnInit {
  public cards: any;
  public userId: any;

  @Input() Post: CardComponent;

  constructor(
    private router: Router,
    private state: Store<AuthState>) {

    let customHeader = new Headers();
    let initVars = {
      headers: customHeader,
      method: 'GET'
    }

    state.select('auth').subscribe(v => {
      if (v.user) {
        this.userId = v.user.localId;
        customHeader.append("userId", this.userId)
      }
    });

    //get from store 
    // callback() {
    // customHeader.append("userId", this.userId)}

    fetch('http://localhost:3000/posts', initVars)
      .then(response => response.json())
      .then(json => {
        this.cards = json
        console.log('cards return json ', this.cards)
      })
    // }
  }

  navigateToPost(index) {
    console.log('click post at ', index)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "postData": JSON.stringify(this.cards[index])
      }
    };

    this.router.navigate([`post/${this.cards[index].id}`], navigationExtras);
  }

  getTypeColor(type) {
    switch (type) {
      case "Events":
        return 'var(--event-color)'
      case "Exchange":
        return 'var(--exchange-color)'
      case "Service":
        return 'var(--service-color)'
      case "Alert":
        return 'var(--alert-color)'
    }
  }

  ngOnInit() {
    console.log('on Init LIST-POSTS')
  }
}
