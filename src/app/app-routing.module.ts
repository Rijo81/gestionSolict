import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

  },
  {
    path: '',
    loadComponent: () => import('./segments/segments.component').then(m => m.SegmentsComponent),
    canMatch: [AuthGuard]
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    canMatch: [AuthGuard]
  },
  {
    path: 'state',
    loadChildren: () => import('./state/state.module').then(m => m.StateModule),
    canMatch: [AuthGuard]
  },
  {
    path: 'list-ls',
    loadChildren: () => import('./list-ls/list-ls.module').then(m => m.ListLsModule),
    canMatch: [AuthGuard]
  },

  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule),
    canMatch: [AuthGuard]
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule),
    canMatch: [AuthGuard]
  },
  {
    path: 'list-categories',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    canMatch: [AuthGuard]
  },
  {
    path: 'segments',
    loadComponent: () => import('./segments/segments.component').then(m => m.SegmentsComponent),
    canMatch: [AuthGuard]
  },
  {
    path: 'list-details',
    loadComponent: () => import('./list-ls/list-details/list-details.component').then(m => m.ListDetailsComponent),
    canMatch: [AuthGuard]
  },
  {
    path: 'list-categories',
    loadComponent: () => import('./categories/list-categories/list-categories.component').then(m => m.ListCategoriesComponent),
    canMatch: [AuthGuard]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  //exports: [RouterModule]
})
export class AppRoutingModule { }
