import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {

  post: Post = {
    id: 0,
    title: '',
    description: '',
    address: '',
    date: '',
    foto: null,
    like: 0,
    type: '',
    contact: '',
    hour: '',
    userId: 0
  }
  form: FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private postService: PostService, private fb: FormBuilder) {
    this.createForm();
   }

  sendPost(event){
    event.preventDefault();
    
    this.postService.addPost(this.form.value).subscribe(
      value => {
        alert("Novo post adicionado com sucesso!")
      },
      error => {
        alert("Seu novo post não foi adicionado, verifique o formulário!")
      }
    )
  }
  createForm() {
    this.form = this.fb.group({
      id: 0,
      title: '',
      description: '',
      address: '',
      date: '',
      foto: null,
      like: 0,
      type: '',
      contact: '',
      hour: '',
      userId: 0,
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('foto').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.toString().split(',')[1]
        })
      };
    }
  }

  clearFile() {
    this.form.get('foto').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
