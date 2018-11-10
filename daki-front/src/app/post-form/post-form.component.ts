import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {

  get type(): any { return this.form.get('type').value; }
  get comercioHidden(): any { return this.form.get('type').value !== 'comercio'; }
  get contatoHidden(): any { return ((this.form.get('type').value === 'comercio') || (this.form.get('type').value === 'troca')) }
  get hourHidden(): any { return ((this.form.get('type').value === 'evento') || (this.form.get('type').value === 'troca')) }
  types: Type[] = [
    { value: 'alerta', viewValue: 'Alerta' },
    { value: 'comercio', viewValue: 'Comércio' },
    { value: 'evento', viewValue: 'Evento' },
    { value: 'troca', viewValue: 'Troca' }
  ];

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

  sendPost(event) {
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
    if (event.target.files && event.target.files.length > 0) {
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
