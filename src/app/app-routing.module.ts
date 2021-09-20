import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {HomeComponent} from './home/home.component';
import {ShopListComponent} from './shop-list/shop-list.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProfileComponent} from './profile/profile.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HistoryComponent} from './history/history.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ChangepasswordComponent} from './changepassword/changepassword.component';
import {ValidationaccountComponent} from './validationaccount/validationaccount.component';
import {HomeAdminComponent} from './home-admin/home-admin.component';
import {TicketsComponent} from './tickets/tickets.component';
import {RequestListComponent} from './request-list/request-list.component';
import {CaisseComponent} from './caisse/caisse.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthguardGuard } from './authguard.guard';
import {PanierComponent} from './panier/panier.component';



const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    pathMatch: 'full'
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path: 'ShopList',
  component: ShopListComponent,
  canActivate: [AuthguardGuard]
},
{
  path: 'ProductList',
    component: ProductListComponent,
    canActivate: [AuthguardGuard]
},
{
  path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthguardGuard]
},
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'ForgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent
  },
  {
    path: 'validation',
    component: ValidationaccountComponent
  },

  {
    path: 'homeAdmin',
    component: HomeAdminComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path: 'ticket',
    component: TicketsComponent,
    canActivate:[AuthguardGuard]
  },

  {
    path: 'requestList',
    component: RequestListComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'caisse',
    component: CaisseComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'panier',
    component: PanierComponent,
    canActivate: [AuthguardGuard]
  },
{
  path: '**',
    component: PageNotFoundComponent
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
