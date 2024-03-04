import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc
} from 'firebase/firestore';
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

  async listCasts(castDate: string, shift: string) {
    const q = query(collection(this.db, 'casts'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const cast = doc.data() as Cast;

      if (cast.scaleDate === castDate && cast.shift === shift) {
        this.casts.push(doc.data() as Cast);
      }
    });
    return this.casts;
  }
  async addCast(cast: Cast) {

    const docRef = await addDoc(collection(this.db, 'casts'), {
      registrationResponsible: cast.nameResponsibleCast,
      nameResponsible: cast.nameResponsibleCast,
      scaleDate: cast.scaleDate,
      sector: cast.sector,
      shift: cast.shift,
      withRestriction: cast.withRestriction,
      withoutRestriction: cast.withoutRestriction,
    });

      console.log(docRef.id)

  }
}
