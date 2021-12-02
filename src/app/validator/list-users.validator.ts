import {User} from "../models/users.model";
import * as moment from 'moment';

export class Validator {

  validateGetUser(currentUser: User, id: string) {
    let birthday = currentUser.birthday ? currentUser.birthday : ""
    // @ts-ignore
    let birthdayDate = birthday ? moment(new Date(birthday["seconds"] * 1000)).format("LL") : "";
    //Validate all fields of user
    currentUser.id = id ? id : '';
    currentUser.name = currentUser.name ? currentUser.name : '';
    currentUser.email = currentUser.email ? currentUser.email : '';
    currentUser.username = currentUser.username ? currentUser.username : '';
    currentUser.birthday = birthdayDate ? birthdayDate : '';
    return currentUser;

  }
  validateGetUserPublic(currentUser: User, id: string) {
    // @ts-ignore
    //Validate all fields of user
    currentUser.id = id ? id : '';
    currentUser.name = currentUser.name ? currentUser.name : '';
    currentUser.email =  '';
    currentUser.username = currentUser.username ? currentUser.username : '';
    currentUser.birthday =  '';
    return currentUser;

  }

}
