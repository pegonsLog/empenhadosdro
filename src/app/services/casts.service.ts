import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
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
    nameResponsible: '',
    officeResponsible: '',
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
    await addDoc(collection(this.db, 'casts'), {
      scaleDate: cast.scaleDate,
      registration: cast.registration,
      nameResponsible: cast.nameResponsible,
      officeResponsible: cast.officeResponsible,
      sector: cast.sector,
      shift: cast.shift,
      withRestriction: cast.withRestriction,
      withoutRestriction: cast.withoutRestriction,
    });
  }

  async oneCast(id: string) {
    const docRef = doc(this.db, 'casts', id);
    const docSnap = await getDoc(docRef);
    const cast = docSnap.data() as Cast;

    if (docSnap.exists()) {
      (this.cast.id = docRef.id),
        (this.cast.scaleDate = cast.scaleDate),
        (this.cast.registration = cast.registration),
        (this.cast.nameResponsible = cast.nameResponsible),
        (this.cast.officeResponsible = cast.officeResponsible),
        (this.cast.sector = cast.sector),
        (this.cast.shift = cast.shift),
        (this.cast.withoutRestriction = cast.withoutRestriction),
        (this.cast.withRestriction = cast.withRestriction);
    }

    return this.cast;
  }

  async updateCast(cast: Cast) {
    const docRef = doc(this.db, 'casts', cast.id);
    await updateDoc(docRef, {
      scaleDate: cast.scaleDate,
      registration: cast.registration,
      nameResponsible: cast.nameResponsible,
      officeResponsible: cast.officeResponsible,
      sector: cast.sector,
      shift: cast.shift,
      withoutRestriction: cast.withoutRestriction,
      withRestriction: cast.withRestriction,
    });
  }

  async removeCast(id: string){
    await deleteDoc(doc(this.db, "casts", id));
  }
}
