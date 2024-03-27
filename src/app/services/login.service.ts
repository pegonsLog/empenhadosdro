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
import { Responsible } from '../interfaces/responsible';
import { environment } from '../shared/environment/environment.development';
import { ForwardRefHandling } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  firebaseConfig = environment.firebase;

  public error: any;

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
    id: '',
  };

  constructor() {}

  async loginResponsible(registration: string, password: string) {
    const q = query(
      collection(this.db, 'responsibles'),
      where('registration', '==', registration)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id) {
        const responsible = doc.data() as Responsible;
        if(responsible.password == password && responsible.registration == registration){
          this.responsible = responsible;
        }
      }
    });

    return this.responsible;
  }

  async oneResponsible(id: string) {
    const docRef = doc(this.db, 'responsibles', id);
    const docSnap = await getDoc(docRef);
    const responsible = docSnap.data() as Responsible;

    if (docSnap.exists()) {
      this.responsible.id = docRef.id;
      this.responsible.registration = responsible.registration;
      this.responsible.nameResponsible = responsible.nameResponsible;
      this.responsible.office = responsible.office;
      this.responsible.sector = responsible.sector;
      this.responsible.shift = responsible.shift;
      this.responsible.password = responsible.password;
      this.responsible.role = responsible.role;
    }

    return this.responsible;
  }
}

// localStorage.setItem('registration',  this.responsible.registration);
// localStorage.setItem('nameResponsible',  this.responsible.nameResponsible);
// localStorage.setItem('office',  this.responsible.office);
// localStorage.setItem('sector',  this.responsible.sector);
// localStorage.setItem('shift',  this.responsible.shift);
// localStorage.setItem('role',  this.responsible.role);

// localStorage.removeItem('registration');
// localStorage.removeItem('password')
