import { AuthService } from 'src/app/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { authReducer } from '../store/reducers/auth.reducer';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          FormsModule,
          HttpClientModule,
          StoreModule.forRoot({
            auth: authReducer
          }),
          RouterTestingModule,
        ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const authService = TestBed.get(AuthService);
  const auth = {
    response: {
      _id: "5be84185986d19418c9957c2",
      profilePhoto: "strewgvwwvvevwevewing",
      name: "vwvvev",
      birthDay: "2018-11-11T00:00:00.000Z",
      district: "strvwvevweing",
      email: "strvewvewveing",
      __v: 0
    },
    TokenLogin: {
      token: "eyJhbGciOiJIUzI1NiJ9.c3RydmV3dmV3dmVpbmc.At9ncCidvMJ2_6cFI_7JCWkW73tYIdTa3PaMBmKbZ8w"
    }
  };

  // spyOn(authService, 'login').and.returnValue(auth);

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call the logIn() method', async(() => {
    fixture.detectChanges();
    let id = fixture.debugElement.query(By.css('#id'));
    expect(id.nativeElement.textContent).toEqual('123456');
  }));
});

/*
it('should call auth login method', async(() => {
 let loginElement: DebugElement;
 const debugElement = fixture.debugElement;
 authService = debugElement.injector.get(AuthService);
 loginSpy = spyOn(authService , 'loginByUsernameAndPassword').and.callThrough();
 loginElement = fixture.debugElement.query(By.css('form'));
 // to set values
 component.loginForm.controls['username'].setValue('user');
 component.loginForm.controls['password'].setValue('123');
 loginElement.triggerEventHandler('ngSubmit', null);
 expect(loginSpy).toHaveBeenCalledTimes(1); // check that service is called once
}));
*/
