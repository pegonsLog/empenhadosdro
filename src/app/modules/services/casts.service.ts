import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { Cast } from '../cast/interface/cast';

@Injectable({
  providedIn: 'root',
})
export class CastsService {
  firebaseConfig = {
    apiKey: 'AIzaSyDjdgKyLalv81OrFUoJP7s58wrnEwOScqE',
    authDomain: 'empenhadosdro.firebaseapp.com',
    projectId: 'empenhadosdro',
    storageBucket: 'empenhadosdro.appspot.com',
    messagingSenderId: '1078063355756',
    appId: '1:1078063355756:web:56a4d76c2444d452bb0549',
    measurementId: 'G-3976WJSBFV',
  };
  private app = initializeApp(this.firebaseConfig);
  private db = getFirestore(this.app);
  casts: Cast[] = [];

  async listCasts() {
    const q = query(collection(this.db, 'casts'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      this.casts.push(doc.data() as Cast);
     
    });
    return this.casts;
  }
}
