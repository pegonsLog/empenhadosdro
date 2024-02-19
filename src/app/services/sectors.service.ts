import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { Sector } from '../interfaces/sector';
import { initializeApp } from 'firebase/app';
import { environment } from '../shared/environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SectorsService {
  firebaseConfig = environment.firebase;

  private app = initializeApp(this.firebaseConfig);
  private db = getFirestore(this.app);
  sectors: Sector[] = [];

  constructor() {}

  async listSectors() {
    const q = query(collection(this.db, 'sectors'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      this.sectors.push(doc.data() as Sector);
    });
    return this.sectors;
  }
}
