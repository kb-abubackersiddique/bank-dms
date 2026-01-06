import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { AuthGuard } from './guards/auth-guard';
import { Upload } from './documents/upload/upload';
import { RoleGuard } from './guards/role-guard';
import { Approve } from './documents/approve/approve';
import { Dashboard } from './dashboard/dashboard';
import { CustomerForm } from './customers/customer-form/customer-form';
import { CustomerList } from './customers/customer-list/customer-list';
import { AuditLog } from './audit-log/audit-log';
import { UserList } from './users/user-list/user-list';
import { UserCreate } from './users/user-create/user-create';
import { Unauthorized } from './unauthorized/unauthorized';
import { Version } from './documents/version/version';
import { CustomerView } from './customers/customer-view/customer-view';
import { AuditorDashboard } from './auditor-dashboard/auditor-dashboard';

const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: Dashboard
  },
  {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
  {
    path: 'upload',
    component: Upload,
    canActivate: [RoleGuard],
    data: { roles: ['OFFICER', 'ADMIN'] }
  },
  {
    path: 'approve',
    component: Approve,
    canActivate: [RoleGuard],
    data: { roles: ['MANAGER', 'ADMIN'] }
  },
  {
  path: 'customers',
  component: CustomerList,
  canActivate: [AuthGuard]
},
{
  path: 'customers/add',
  component: CustomerForm,
  canActivate: [RoleGuard],
  data: { roles: ['OFFICER', 'ADMIN'] }
},
{
  path: 'customers/view/:id',
  component: CustomerView,
  canActivate: [RoleGuard],
  data: { roles: ['OFFICER', 'MANAGER', 'ADMIN'] }
},

{
  path: 'customers/edit/:id',
  component: CustomerForm,
  canActivate: [RoleGuard],
  data: { roles: ['OFFICER', 'ADMIN'] }
},
{
  path: 'audit-logs',
  component: AuditLog,
  canActivate: [RoleGuard],
  data: { roles: ['ADMIN', 'AUDITOR'] }
},
{
  path: 'users',
  component: UserList,
  canActivate: [RoleGuard],
  data: { roles: ['ADMIN'] },
},
{
  path: 'users/create',
  component: UserCreate,
  canActivate: [RoleGuard],
  data: { roles: ['ADMIN'] },
},
{
  path: 'documents/history/:customerId/:docType',
  component: Version,
  canActivate: [AuthGuard]
}
,
{
  path: 'auditor-dashboard',
  component: AuditorDashboard,
  canActivate: [AuthGuard],
  data: { roles: ['AUDITOR'] }
},

{ path: 'unauthorized', component: Unauthorized },
  { path: '**', redirectTo: 'login' }




];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
