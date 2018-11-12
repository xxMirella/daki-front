import { Component, OnInit, Input } from '@angular/core';
import { faHeart, faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  // title = ''
  @Input() item
  private image;
  userName: string = '';
  type: string = '';
  // image: string = '';
  title: string = '';
  address: string = '';
  date: string = '';
  hour: string = '';
  link: string = '';
  description: string = '';
  contact: string = '';
  like: boolean = false;
  faStar = faStar;
  faHeart = faHeart;
  faArrowLeft = faArrowLeft;
  fav: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    // console.log(this.card)
    // this.title = Data.title
    // console.log(this.title)
  }

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    if (id !== undefined) {
      this.getPostData(id)
    }
    else {
      this.setData()
    }
  }

  getPostData(targetId) {
    fetch(`http://localhost:3000/posts/${targetId}`)
      .then(response => response.json())
      .then(json => {
        this.item = json
        this.setData()
        console.log(this.item)
      })
  }

  setData() {
    this.userName = this.item.userName;
    this.type = this.item.type;
    this.image = this.item.image;
    this.title = this.item.title;
    this.address = this.item.address;
    this.date = this.item.date;
    this.hour = this.item.hour;
    this.link = this.item.link;
    this.description = this.item.description;
    this.contact = this.item.contact;
    this.like = this.item.like;
    this.fav = this.item.fav;
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

  goToHome() {
    this.router.navigate([''])
  }

  isValidImg(item) {
    return item.image.value;
  }

  getImage(item) {
    this.image = `data:${item.image.filetype};base64,${item.image.value}`
    console.log(this.image + " " + (item.image.value))
    return this.image;
  }
}




    // switch (this.item.type) {
    //   case 'alerta':
    //     this.firstLine = this.item.address
    //     break;
    //   case 'comercio':
    //     this.firstLine = this.item.contact
    //     break;
    //   case 'evento':
    //     this.firstLine = this.item.date + this.item.hour
    //     break;
    //   case 'troca':
    //     this.firstLine = this.item.date + this.item.hour
    // }
