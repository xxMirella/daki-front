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
  @Input() userId
  faHeart = faHeart;
  faStar = faStar;
  type = ''
  subtitle = '';
  title = '';
  id = '';
  class = ''
  bgColor = ''
  isFav: boolean = false

  constructor(
    private router: Router) {
  }

  ngOnInit() {
    console.log('on Init POST ', this.item)
    this.title = this.item.title
    this.subtitle = this.item.subtitle
    this.isFav = (this.item.type === 'Service' || this.item.type === 'Event') ? true : false

    switch (this.item.type) {
      case "Events":
        return this.subtitle = `${this.item.date} - ${this.item.hour}`
      case "Exchange":
        return this.subtitle = `${this.item.date} - ${this.item.hour}`
      case "Service":
        return this.subtitle = this.item.contact
      case "Alert":
        return this.subtitle = this.item.address
    }
  }

  gotoPost() {
    this.router.navigate([`/post/${this.item.id}`])
  }

  clickLike(id) {
    console.log('like', this.item.id, this.item.userId)
    event.stopPropagation();
    this.item.like = !this.item.like
    const request = {
      userId: this.item.userId,
      postId: this.item.id
    }

    fetch('http://localhost:3000/posts', {
      body: JSON.stringify(request)
    })
  }

  clickFav() {
    console.log('fav', this.item.id, this.item.userId)
    event.stopPropagation();

    this.item.fav = !this.item.fav
    const request = {
      userId: this.item.userId,
      postId: this.item.id
    }

    fetch('http://localhost:3000/posts', {
      body: JSON.stringify(request)
    })
  }

  getTypeColor(type) {
    switch (type) {
      case "Events":
        return 'var(--primary)'
      case "Exchange":
        return 'var(--warning)'
      case "Service":
        return 'var(--teal)'
      case "Alert":
        return 'var(--danger)'
    }
  }
}
