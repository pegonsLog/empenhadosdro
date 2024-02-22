import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { Cast } from '../interfaces/cast';
import { environment } from '../shared/environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CastsService {
  firebaseConfig = environment.firebase;

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
