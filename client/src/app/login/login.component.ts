import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VALIDATION_REGEX } from 'src/app/shared/regex';
import  swal from  "sweetalert2";
import { TYPE } from 'src/app/login/value.constant';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  // public loginValid = true;
  // public username = '';
  // public password = '';
  public submitted: boolean = false;
  public showPassword: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
  }

  loginForm = this.fb.group({
    // name: this.fb.control(
    //   "",
    //   Validators.compose([
    //     Validators.required,
    //     Validators.pattern(VALIDATION_REGEX. VALID_NAME),
    //     Validators.maxLength(150),
    //   ])
    // ),
    email: this.fb.control(
      "",
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(VALIDATION_REGEX.EMAIL),
        Validators.maxLength(150),
      ])
    ),
    password: this.fb.control(
      "",
      Validators.compose([
        Validators.required,
        Validators.minLength(7),
      ])
    )
  });


  show(typeIcon = TYPE.SUCCESS) {
    swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: typeIcon,
      confirmButtonText: 'Cool'
    });
  }

  

  toast(typeIcon = TYPE.SUCCESS, timerProgressBar: boolean = true , msg: any) {
    swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 2000,
      title: msg,
    })
  }

  onLogin() {
  this.submitted = true;
    if(this.loginForm.valid){
      this.http.post("http://localhost:2000/login", this.loginForm.value)
      .subscribe({
        next: (response : any) => {
        if(response.success == true){
          sessionStorage.setItem("login" , "true");
          sessionStorage.setItem("token" , response.data.token);
          // // this.toast(TYPE.SUCCESS, true , 'Login Successfully');
          // localStorage.setItem("currentUser", JSON.stringify(this.loginForm)); 
          this.router.navigate(["land"]);
           
        }
      },
      error: (err) => {
        if(err.status === 400) {
          console.log('Error: ', err.error.error);
          this.toast(TYPE.ERROR, true , err.error.error);
        }
      }
    })
  }
}

onReset(){
    this.submitted = false;
    this.loginForm.reset();
}

togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
}

get uf() {
    return this.loginForm.controls;
}


}
