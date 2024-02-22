import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { User } from '../interfaces/user';
import { environment } from '../shared/environment/environment.development';
import { ConnectableObservable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  firebaseConfig = environment.firebase;

  private app = initializeApp(this.firebaseConfig);
  private db = getFirestore(this.app);
  user: User = {
    user: '',
    nameUser: '',
    password: '',
    role: '',
  };

  async loginUser(user: string) {
    const q = query(collection(this.db, "users"), where("user", "==", user));

    const querySnapshot = await getDocs(q);

   querySnapshot.forEach((doc) => {
      if(doc.data()){
        console.log(doc.data());
      }}
    )
  }


}