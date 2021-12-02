import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListUsersComponent} from "./controller/list-users.component";
import {CreateUpdateUsersComponent} from "./controller/create-update-users.component";

const routes: Routes = [
  {path: '', redirectTo: "list-users", pathMatch: "full"},
  {path: 'list-users', component: ListUsersComponent},
  {path: 'create-user', component: CreateUpdateUsersComponent},
  {path: 'edit-user/:id', component: CreateUpdateUsersComponent},
  {path: '**', redirectTo: "list-users", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
