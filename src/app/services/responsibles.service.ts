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
  where,
} from 'firebase/firestore';
import { Responsible } from '../interfaces/responsible';
import { environment } from '../shared/environment/environment.development';

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
    shift: '',
    password: '',
    role: '',
    id: '',
  };

  private id: string = '';

  constructor() {}

  async listResponsibles() {
    const q = query(collection(this.db, 'responsibles'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const responsible = doc.data() as Responsible;
      responsible.id = doc.id;

      this.responsibles.push(responsible);
    });
    return this.responsibles;
  }

  async responsibleRegisterCast(registration: string) {
    const q = query(
      collection(this.db, 'responsibles'),
      where('registration', '==', registration)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc) {
        this.responsible = doc.data() as Responsible;
      }
    });
    return this.responsible;
  }

  async responsibleReportCast(dateReport: string, shift: string) {
    const q = query(
      collection(this.db, 'responsibles'),
      where('dateReport', '==', dateReport) && where('shift', '==', shift)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc) {
        this.responsible = doc.data() as Responsible;
      }
    });
    return this.responsible;
  }

  async addResponsible(responsible: Responsible) {
    const docRef = await addDoc(collection(this.db, 'responsibles'), {
      registration: responsible.registration,
      nameResponsible: responsible.nameResponsible,
      office: responsible.office,
      sector: responsible.sector,
      shift: responsible.shift,
      password: responsible.password,
      role: responsible.role,
    });
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

  async updateResponsible(responsible: Responsible) {
    const docRef = doc(this.db, 'responsibles', responsible.id);
    await updateDoc(docRef, {
      registration: responsible.registration,
      nameResponsible: responsible.nameResponsible,
      office: responsible.office,
      sector: responsible.sector,
      shift: responsible.shift,
      password: responsible.password,
      role: responsible.role,
    });
  }

  async removeResponsible(id: string){
    await deleteDoc(doc(this.db, "responsibles", id));
  }
}
