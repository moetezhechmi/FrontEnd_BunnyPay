import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HistoryComponent } from './history/history.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ValidationaccountComponent } from './validationaccount/validationaccount.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { RequestListComponent } from './request-list/request-list.component';
import { TicketsComponent } from './tickets/tickets.component';
import {PdfMakeWrapper} from 'pdfmake-wrapper';
import {AgmCoreModule} from '@agm/core';
import { CaisseComponent } from './caisse/caisse.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthguardService } from './authguard.service';
import { PanierComponent } from './panier/panier.component';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ShopListComponent,
    ProductListComponent,
    PageNotFoundComponent,
    ProfileComponent,
    NavbarComponent,
    SidebarComponent,
    HistoryComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ChangepasswordComponent,
    ValidationaccountComponent,
    SidebarAdminComponent,
    NavbarAdminComponent,
    HomeAdminComponent,
    RequestListComponent,
    TicketsComponent,
    CaisseComponent,
    CheckoutComponent,
    PanierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBefLoNbeCzy4r437CPqHu8JK-lUwMqMx8',
      libraries: ['places']
    })
  ],
  providers: [
    AuthguardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
