import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from '../../auth/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

import { AuthGuard } from '../../shared/guard/auth.guard';
import { HomeComponent } from 'src/app/components/home/home.component';
import { SignInComponent } from 'src/app/auth/sign-in/sign-in.component';
import { ForgotPasswordComponent } from 'src/app/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from 'src/app/auth/verify-email/verify-email.component';
import { CoursesContainerComponent } from 'src/app/courses/courses-container/courses-container.component';
import { CourseComponent } from 'src/app/courses/course/course.component';
import { BlogContainerComponent } from 'src/app/blog/blog-container/blog-container.component';
import { PostComponent } from 'src/app/blog/post/post.component';
import { AddJobComponent } from 'src/app/components/add-job/add-job.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'courses', component: CoursesContainerComponent },
  { path: 'course/:id', component: CourseComponent },
  { path: 'blog', component: BlogContainerComponent },
  { path: 'blog/:id', component: PostComponent },
  { path: 'add-job', component: AddJobComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
