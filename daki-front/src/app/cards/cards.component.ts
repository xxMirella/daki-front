import { Component, OnInit, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-cards-list',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsListComponent implements OnInit {
  public cards: any

  @Input() Post: CardComponent

  constructor(private router: Router) {
    // https://jsonplaceholder.typicode.com/posts
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(json => {
        this.cards = json
        console.log('cards return json ', this.cards)
      })

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