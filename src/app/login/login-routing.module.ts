import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {SignupComponent} from "./components/signup/signup.component";

const routes: Routes = [
  {path:'', component: LayoutComponent
    ,children:[
      {path:'',component:LoginComponent},
      {path:'login',component:LoginComponent},
      {path: 'signup', component: SignupComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
