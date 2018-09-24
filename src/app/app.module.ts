import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEnPh from '@angular/common/locales/en-PH';
import localeEnPhExtra from '@angular/common/locales/extra/en-PH';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthGuard } from './auth/auth.guard';

import { AuthService } from './auth/auth.service';
import { ProfileComponent } from './profile/profile.component';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { AppMaterialModule } from './app-material/app-material.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProfileService } from './profile.service';
import { EmployeeComponent } from './employee/employee.component';
import { VisitorComponent } from './visitor/visitor.component';
import { ResidentComponent } from './resident/resident.component';
import { ProfileNotFoundComponent } from './profile-not-found/profile-not-found.component';
import { OPIDComponent } from './op-id/op-id.component';

// the second parameter 'fr' is optional
// registerLocaleData(localeFr, 'fr');
// registerLocaleData(localeFr, 'fr-FR', localeFrExtra);
registerLocaleData(localeEnPh, 'en-PH', localeEnPhExtra);

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    SearchBarComponent,
    EmployeeComponent,
    VisitorComponent,
    ResidentComponent,
    ProfileNotFoundComponent,
    OPIDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-PH' },
    ProfileService,
    MessageService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
