import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenchListComponent } from './components/bench/admin-bench-list/admin-bench-list.component';

const routes: Routes = [
  {
    path: 'bench',
    component: BenchListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
