import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  private image;
  @Input() post: Post;
  constructor() { }

  ngOnInit() {
  }

  isValidImg(post) {
    return post.foto.value;
  }

  getImage(post) {
    this.image = `data:${post.foto.filetype};base64,${post.foto.value}`
    console.log(this.image + " " + (post.foto.value))
    return this.image;
  }
}
