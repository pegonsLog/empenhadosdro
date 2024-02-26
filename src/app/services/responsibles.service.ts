import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../shared/environment/environment.development';
import { Responsible } from '../interfaces/responsible';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ResponsiblesService {
  firebaseConfig = environment.firebase;

  private app = initializeApp(this.firebaseConfig);
  private db = getFirestore(this.app);
  responsibles: Responsible[] = [];
  responsible: Responsible = {
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: ''
  }

  constructor() {}

  async listResponsibles() {
    const q = query(collection(this.db, 'responsibles'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      this.responsibles.push(doc.data() as Responsible);
    });
    return this.responsibles;
  }

  async responsibleRegisterCast(registrationResponsible: string) {
    const q = query(collection(this.db, "responsibles"), where("registration", "==", registrationResponsible));

    const querySnapshot = await getDocs(q);

   querySnapshot.forEach((doc) => {if(doc){
        this.responsible = doc.data() as Responsible;      }}
    );
  return this.responsible
  }

}
