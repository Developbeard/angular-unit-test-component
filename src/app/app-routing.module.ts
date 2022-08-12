import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OthersComponent } from './components/others/others.component';
import { PeopleComponent } from './components/people/people.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'others', component: OthersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
