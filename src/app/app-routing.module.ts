import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/authGuardService/auth-guard.services';
import { loginContentClassComponent } from './user-login/login/login.component';
import { ResetComponent } from './user-login/resetPassword/resetPassword.component';
import { SetPasswordComponent } from './user-login/set-password/set-password.component';
import { SetSecurityQuestionsComponent } from './user-login/set-security-questions/set-security-questions.component';
import { MultiRoleScreenComponent } from './multi-role-screen/multi-role-screen.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { ProviderAdminComponent } from './app-provider-admin/provider-admin/provider-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: loginContentClassComponent,
  },
  {
    path: 'resetPassword',
    component: ResetComponent,
  },
  {
    path: 'setQuestions',
    component: SetSecurityQuestionsComponent,
  },
  {
    path: 'MultiRoleScreenComponent',
    component: MultiRoleScreenComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'superAdmin',
        component: SuperAdminComponent,
        outlet: 'postLogin_router',
      },
      {
        path: 'providerAdmin',
        component: ProviderAdminComponent,
        outlet: 'postLogin_router',
      },
    ],
  },
  {
    path: 'setPassword',
    component: SetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
