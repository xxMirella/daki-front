import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  posts: Post[] = [];

  constructor(public postService: PostService) {
      postService.getPosts().subscribe(value => {
        this.posts = value;
      });
  }

}
