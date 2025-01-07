import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersContainerComponent } from './components/users-container/users-container.component';
import { usersResolver } from './resolvers/users.resolver';


const routes: Routes = [
  {
    path:'users',loadComponent:()=>UsersContainerComponent,
    resolve:{
      getUsers:usersResolver,
      
    }
  },
  {
    path:'',redirectTo:'users',pathMatch:'full'
  },
  {
    path:'**',redirectTo:'',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
