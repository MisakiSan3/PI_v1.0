import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginGuard } from '../guards/login.guard';

const routes: Routes=[
  {path:'register' ,canActivate:[LoginGuard],component:RegisterComponent},
  {path: 'login',canActivate:[LoginGuard], component:LoginComponent},
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AuthRoutingModuleModule { }
