import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
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
  public cast: Cast = {
    id: '',
    registration: '',
    nameResponsibleCast: '',
    officeResponsibleCast: '',
    scaleDate: '',
    sector: '',
    shift: '',
    withoutRestriction: 0,
    withRestriction: 0,
  };

  async listCasts(castDate: string, shift: string) {
    const q = query(collection(this.db, 'casts'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const cast = doc.data() as Cast;
      cast.id = doc.id;
      if (cast.scaleDate === castDate && cast.shift === shift) {

        this.casts.push(cast);
      }
    });
    return this.casts;
  }
  async addCast(cast: Cast) {

    const docRef = await addDoc(collection(this.db, 'casts'), {
      registration: cast.registration,
      nameResponsible: cast.nameResponsibleCast,
      scaleDate: cast.scaleDate,
      sector: cast.sector,
      shift: cast.shift,
      withRestriction: cast.withRestriction,
      withoutRestriction: cast.withoutRestriction
    });

  }


  async updateCast(id: string) {

    const docRef = doc(this.db, 'casts', id);
    const docSnap = await getDoc(docRef);
    const cast = docSnap.data() as Cast;

    if(docSnap.exists()){
      this.cast.id = docRef.id,
      this.cast.scaleDate = cast.scaleDate,
      this.cast.registration = cast.registration,
      this.cast.nameResponsibleCast = cast.nameResponsibleCast,
      this.cast.officeResponsibleCast = cast.officeResponsibleCast,
      this.cast.sector = cast.sector,
      this.cast.shift = cast.shift,
      this.cast.withoutRestriction = cast.withoutRestriction,
      this.cast.withRestriction = cast.withRestriction

    }

    return this.cast;

}
}
