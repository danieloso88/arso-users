import {Component, OnInit} from '@angular/core';
import {User} from "../models/users.model";
import {UsersService} from "../services/users.service";
import {ToastrService} from "ngx-toastr";
import {Validator} from "../validator/list-users.validator";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";


@Component({
  selector: 'app-list-users',
  templateUrl: '../View/list-users.component.html',
  styleUrls: ['../style/list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  searchUsername: FormGroup
  isPublic = false;
  isPublicMode: string = "Public Mode"
  isSearching: boolean = false
  allUsers: User[] = []
  users: User[] = []
  submitted = false;
  selected: any;
  usersToShow: string[] = [];
  selectUsername = new FormControl();
  displayedColumns: string[] = ['name', 'username', 'birthday', 'email', 'actions'];
  displayedPublicColumns: string[] = ['name', 'username'];
  expandedUser!: User | null;
  dataSource: any
  filteredOptions!: Observable<string[]>;

  validator = new Validator();

  constructor(private fb: FormBuilder,
              private _userService: UsersService,
              private toastr: ToastrService) {
    this.searchUsername = this.fb.group({
      selectUsername: ['', Validators.required]
    })
    this.users = this.isSearching ? this.users : this.allUsers

  }

  ngOnInit(): void {
    this.getUsers();
    this.filteredOptions = this.selectUsername.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value)),
    );


  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.usersToShow.filter(username => username.toLowerCase().includes(filterValue));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUsers() {
    // set empty this.dataSource
    this._userService.getUsersList().subscribe(user => {
      this.allUsers = [];
      user.forEach((element: any) => {
        this.validateGetUsers(element);
      });
      this.dataSource = new MatTableDataSource(this.allUsers);

    })
  }

  //delete user by id
  deleteUser(id: string) {
    this._userService.deleteUser(id).then(() => {
      this.toastr.success("Usuario eliminado correctamente", "Usuario eliminado", {positionClass: 'toast-center-center'})
    }).catch(() => {
      this.toastr.error("Error al eliminar usuario", "Error")
    })
  }


  validateGetUsers(element: any) {
    let currentUser = element.payload.doc;
    let userValidated = this.validator.validateGetUser(currentUser.data(), currentUser.id)
    if (userValidated) {
      this.allUsers.push(userValidated);
      this.usersToShow.push(userValidated.username);
    } else {
      this.toastr.error("Error, try again", "Error")
    }
  }

  validateGetPublicUsers(element: any) {
    let currentUser = element.payload.doc;
    let userValidated = this.validator.validateGetUserPublic(currentUser.data(), currentUser.id)
    if (userValidated) {
      this.allUsers.push(userValidated);
      this.usersToShow.push(userValidated.username);
    } else {
      this.toastr.error("Error, try again", "Error")
    }
  }

  validateGetUser(user: any) {
    let userValidated = this.validator.validateGetUser(user, user.id)
    if (userValidated) {
      this.users = [];
      this.users.push(userValidated);
      this.usersToShow.push(userValidated.username);
      this.dataSource = new MatTableDataSource(this.users);
      this.toastr.success("User found", "Founded")
    } else {
      this.toastr.error("Error, try again ", "Error")
    }
  }


  getUserByUsernamePromise(username: string) {
    return new Promise((resolve, reject) => {
      let user = this.allUsers.find(user => user.username === username);
      if (user) {
        this._userService.getUser(user.id).subscribe(user => {
          this.validateGetUser(user);
          resolve(user);
        })
      } else {
        reject("User didn't found")
        alert("ERROR")
      }
    }).then((result) => {
      alert("Searching...")
    }).catch((reject) => {
      alert("No finded")
      this.toastr.error("Error, try again", "Error")
    })
  }

  setIsPublic() {
    this.isPublic = !this.isPublic
    if (this.isPublic) {
      this.isPublicMode = "Private Mode"
      this.getPublicUsers()
    } else {
    this.isPublicMode = "Public Mode"
      this.getUsers()
    }
  }

  getPublicUsers() {
    this._userService.getUsersList().subscribe(user => {
      this.allUsers = [];
      user.forEach((element: any) => {
        this.validateGetPublicUsers(element);
      });
      this.dataSource = new MatTableDataSource(this.allUsers);
    })
  }


}
