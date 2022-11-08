import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  swal from  "sweetalert2";
import { Router } from '@angular/router';
import { TYPE } from 'src/app/login/value.constant';

declare const google: any;
// const dataUrl = 'http://localhost:2000/land';
// const httpOptions = {
//   headers: new Headers({ 'Content-Type': 'application/json'})
// }


  let header = new HttpHeaders().set(
    "Authorization",
     sessionStorage.getItem("token")
  );

@Component({
  selector: 'app-land-purchase',
  templateUrl: './land-purchase.component.html',
  styleUrls: ['./land-purchase.component.css']
})
export class LandPurchaseComponent implements OnInit {
// @Input() data = [];
  public mapAreaSelect: string = 'land-purchase';
  @Input() mapArea : string = "Hi there";

  selectedLandArea : string

    constructor(
      private http: HttpClient,
      private router: Router,
    ) { }

  ngOnInit() {
    this.selectedLandArea = JSON.parse(localStorage.getItem('landArea'));
    console.log("retrievedObject : " , this.selectedLandArea);
  }

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

  buyLand(){
    // let payload;
    // payload ={
    //   selectedLandArea : this.selectedLandArea
    // }
    this.http.post( "http://localhost:2000/land" , {landArea:[this.selectedLandArea]} ,{headers:header})
    .subscribe({
      next: (response : any) => { 
        window.alert("Land Purchased Successfully");
        this.router.navigate(["map"]);
        return response

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
