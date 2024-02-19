import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { User } from '../interfaces/user';
import { environment } from '../shared/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  firebaseConfig = environment.firebase;

  private app = initializeApp(this.firebaseConfig);
  private db = getFirestore(this.app);
  users: User[] = [];

  async listCasts() {
    const q = query(collection(this.db, 'users'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      this.users.push(doc.data() as User);
    });
    return this.users;
  }

}
