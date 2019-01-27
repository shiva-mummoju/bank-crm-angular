import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from './user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


import * as firebase from 'firebase/app';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDetailsService {

  user$: Observable<User>;
  user: any;
  isLoggedIn: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public store: StoreService
  ) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      }))

  }


  // async googleSignin() {
  //   const provider = new auth.GoogleAuthProvider();
  //   const credential = await this.afAuth.auth.signInWithPopup(provider);
  //   return this.updateUserData(credential.user);
  // }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        })
    })
  }

  doRegister(obj) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password)
        .then(res => {
          obj.uid = res.user.uid;
          this.updateUserData(obj)
            console.log(res);
            resolve(res);
          // })
        }, err => reject(err));
    })
  }

  doLogin(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        },
          err => {
            reject(err);
          }).catch(err => {
            console.log(err);
            this.store.showError("error" , "error");
          })
    })
  }


  private updateUserData(obj) {
    // Sets user data to firestore on login
    // console.log('updating user data');
    // const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    // const data = {
    //   uid: user.uid,
    //   email: user.email,
    //   displayName: user.displayName, 
    //   // photoURL: user.photoURL
    // }

    // return userRef.set(data, { merge: true })

    let o  = this.afs.collection<User>(`users/`);
    o.add(obj);

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  doSignOut(){
    firebase.auth().signOut().then(res => {
      console.log(res);
      this.isLoggedIn = false;
      this.user = null;
    
      this.store.showsuccess('Logged out','Logged out');
      this.goToLogin();
    },
    err => {
      this.store.showError('error in loggin out' , 'error');
    });
  }
}
