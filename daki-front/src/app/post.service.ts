import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  URL = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.URL);
  }

  addPost(post: FormGroup){
    return this.http.post(this.URL, post)
  }
}
