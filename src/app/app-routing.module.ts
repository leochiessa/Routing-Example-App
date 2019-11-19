import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CareerListComponent } from './components/career-list/career-list.component';
import { UserSignUpComponent } from './components/user-signup/user-signup.component';
import { UserLogInComponent } from './components/user-login/user-login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: 'add', component: StudentAddComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: StudentViewComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: StudentEditComponent, canActivate: [AuthGuard] },
  { path: 'list', component: StudentListComponent, canActivate: [AuthGuard] },
  { path: 'career', component: CareerListComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: UserSignUpComponent },
  { path: 'login', component: UserLogInComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }