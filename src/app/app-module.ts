import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { Login } from './login/login';
import { Upload } from './documents/upload/upload';
import { Approve } from './documents/approve/approve';
import { Version } from './documents/version/version';
import { Dashboard } from './dashboard/dashboard';
import { CustomerList } from './customers/customer-list/customer-list';
import { CustomerForm } from './customers/customer-form/customer-form';
import { AuditLog } from './audit-log/audit-log';
import { UserList } from './users/user-list/user-list';
import { UserCreate } from './users/user-create/user-create';
import { Unauthorized } from './unauthorized/unauthorized';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerView } from './customers/customer-view/customer-view';
import { Header } from './header/header';
import { AuditorDashboard } from './auditor-dashboard/auditor-dashboard';

@NgModule({
  declarations: [
    App,
    Login,
    Upload,
    Approve,
    Version,
    Dashboard,
    CustomerList,
    CustomerForm,
    AuditLog,
    UserList,
    UserCreate,
    Unauthorized,
    CustomerView,
    Header,
    AuditorDashboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [App]
})
export class AppModule { }
