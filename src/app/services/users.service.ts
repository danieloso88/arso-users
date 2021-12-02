import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {User} from "../models/users.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afs: AngularFirestore) {
  }

  getUsersList(): Observable<any> {
    return this.afs
      .collection('users',
        ref => ref.where('isActive', '==', true)).snapshotChanges();
  }

  getUser(id: string): Observable<User> {
    return this.afs
      .collection('users').doc(id).snapshotChanges()
      .pipe(map(doc => {
        let data = doc.payload.data() as User;
        data.id = doc.payload.id;
        return data
      }));

  }

  addUser(user: User): Promise<any> {
    return this.afs.collection('users').add(user);
  }

  updateUser(id: string, user: User): Promise<any> {
    return this.afs.collection('users').doc(id).update(user);
  }

  deleteUser(id: string): Promise<any> {
    return this.afs
      .collection('users').doc(id).update({isActive: false});
  }

}
