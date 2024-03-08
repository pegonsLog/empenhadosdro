import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from 'firebase/firestore';
import { Responsible } from '../interfaces/responsible';
import { environment } from '../shared/environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  firebaseConfig = environment.firebase;

  private app = initializeApp(this.firebaseConfig);
  private db = getFirestore(this.app);
  responsible: Responsible = {
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: '',
    id: ''
  };

  async loginResponsible(user: string, password: string) {
    const q = query(collection(this.db, "responsibles"), where("user", "==", user) && where("password", "==", password));

    const querySnapshot = await getDocs(q);

   querySnapshot.forEach((doc) => {if(doc){
        this.responsible = doc.data() as Responsible;
      }}
    );
  return this.responsible
  }
}
