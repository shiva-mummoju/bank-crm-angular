import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth.guard';


// imports for firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// imports for material design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { TransactionsComponent } from './transactions/transactions.component';
import { EmiComponent } from './emi/emi.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule , MatInputModule ,MatButtonModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';


// list of urls for the routing module
const appRoutes: Routes = [
  { path: 'transaction', component: TransactionsComponent,  canActivate: [AuthGuard]  },
  { path: 'emi', component: EmiComponent,  canActivate: [AuthGuard]  },
  { path: 'profile', component: ProfileComponent ,  canActivate: [AuthGuard] },
  // { path: 'auth', component: AuthComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '**', component:  HomeComponent,  canActivate: [AuthGuard] }
];


// firebase credentials
const config = {
  apiKey: "AIzaSyB9S4_0mz-Vm3ubTE1mT7kGzdt2qhtU-WM",
  authDomain: "bank-crm-2e92a.firebaseapp.com",
  databaseURL: "https://bank-crm-2e92a.firebaseio.com",
  projectId: "bank-crm-2e92a",
  storageBucket: "",
  messagingSenderId: "27279899814"
};




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TransactionsComponent,
    EmiComponent,
    ProfileComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule .forRoot(appRoutes) ,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    // AngularFireStorageModule // storage
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [ AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
