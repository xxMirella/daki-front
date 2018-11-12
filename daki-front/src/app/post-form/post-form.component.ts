import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthState } from '../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';


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
  get contatoHidden(): any { return ((this.form.get('type').value === 'comercio') || (this.form.get('type').value === 'troca')); }
  get hourHidden(): any { return ((this.form.get('type').value === 'evento') || (this.form.get('type').value === 'troca')); }
  types: Type[] = [
    { value: 'alerta', viewValue: 'Alerta' },
    { value: 'comercio', viewValue: 'Comércio' },
    { value: 'evento', viewValue: 'Evento' },
    { value: 'troca', viewValue: 'Troca' }
  ];

  post: any = {
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
  };
  form: FormGroup;
  loading = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router,
    private state: Store<AuthState>) {
    this.createForm();
    state.select('auth').subscribe(v => {
      if (v.user) {
        this.form.get('userId').setValue(v.user.localId);
      }
    });
  }

  sendPost(event) {
    event.preventDefault();

    this.postService.addPost(this.form.value).subscribe(
      () => {
        alert('Novo post adicionado com sucesso!');
        this.router.navigateByUrl('/posts').then();
      },
      () => {
        alert('Seu novo post não foi adicionado, verifique o formulário!');
      }
    );
  }
  createForm() {
    this.form = this.fb.group({
      id: 0,
      title: '',
      description: '',
      address: '',
      date: '',
      image: null,
      like: 0,
      type: '',
      contact: '',
      hour: '',
      userId: 0,
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.toString().split(',')[1]
        });
      };
    }
  }

  clearFile() {
    this.form.get('image').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
