import { StoreModule } from '@ngrx/store';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { authReducer } from './store/reducers/auth.reducer';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        NgxMaskModule.forRoot(),
        StoreModule.forRoot({
          auth: authReducer
        }),
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  /* it(`should have as title 'daki-social-network'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('daki-social-network');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to daki-social-network!');
  }); */
});
