import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  // title = ''
  @Input() item
  faHeart = faHeart;
  faStar = faStar;
  subtitle = '';
  title = '';
  id = '';
  class = ''
  bgColor = ''

  constructor(private router: Router) {
    console.log(this.item);
    // this.title = Data.title
    // console.log(this.title)
  }

  ngOnInit() {
    console.log('on Init POST ', this.item)
  }

  gotoPost() {
    this.router.navigate([`/post/${this.item.id}`])
  }

  clickLike() {
    this.item.like = !this.item.like
  }

  clickFav() {
    this.item.fav = !this.item.fav
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
}
