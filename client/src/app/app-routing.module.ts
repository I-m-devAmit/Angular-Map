import { NgModule } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { AgmExampleComponent } from './agm-example/agm-example.component';
import { RouterModule, Routes } from "@angular/router";
import { LandPurchaseComponent } from "./land-purchase/land-purchase.component";
import { AuthGuard } from "./auth.guard";


let route:Routes = [ 

    {
      path:'', component:AgmExampleComponent
    },
    {
      path:'map', component:AgmExampleComponent , canActivate : [AuthGuard]
    },
    {
       path:'login', component: LoginComponent
    },
    {
      path:'land', component: LandPurchaseComponent , canActivate : [AuthGuard]
    }
  ]
@NgModule({
    imports:[RouterModule.forRoot(route)],
    exports:[RouterModule]
})

export class AppRoutingModule {}