import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../models/users.model";

@Component({
  selector: 'app-create-update-users',
  templateUrl: '../View/create-update-users.component.html',
  styleUrls: ['../style/create-update-users.component.scss']
})
export class CreateUpdateUsersComponent implements OnInit {
  createUser: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = 'Add User';
  btnAddUpd = 'Add';

  constructor(private fb: FormBuilder,
              private _userService: UsersService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createUser = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.isEdit();

  }


  addEditUser() {
    this.submitted = true;
    this.loading = true;

    const user: User = {
      id: "",
      name: this.createUser.value.name,
      username: this.createUser.value.username,
      email: this.createUser.value.email,
      birthday: this.createUser.value.birthday,
      isActive: true,

    }
    if (this.createUser.invalid) {
      return;
    }
    if (this.id == null) {
      this.addUser(user);
    } else {
      this.editUser(this.id, user);
    }
  }

  addUser(user: User) {

    this._userService.addUser(user).then(() => (
        this.toastr.success("User registered", "User registered", {positionClass: 'toast-center-center'}),
        this.router.navigate(['list-users'])
    )).catch(error => {
        console.log(error);
        this.toastr.error("Error, try again", "User no registered", {positionClass: 'toast-center-center'}),
          this.loading = false;

      }
    )

  }

  editUser(id: string, user: User) {

    this.loading = true;
    this._userService.updateUser(id, user).then(() => {
      this.loading = false;
      this.toastr.info("User cannot be update", "User update", {positionClass: 'toast-center-center'})
      this.router.navigate(['list-user'])
    });
  }

  isEdit() {
    if (this.id !== null) {
      this.title = 'Edit User';
      this.btnAddUpd = 'Update';
      this._userService.getUser(this.id).subscribe(data => {
        // @ts-ignore
        let birthday = new Date(data.birthday['seconds'] * 1000);
        this.createUser.setValue({
          name: data.name,
          username: data.username,
          email: data.email,
          birthday: data.birthday
        })
      })
    }
  }


}
