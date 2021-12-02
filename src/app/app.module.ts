import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './controller/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {environment} from '../environments/environment';
import {UsersService} from "./services/users.service";
import { ListUsersComponent } from './controller/list-users.component';
import { CreateUpdateUsersComponent } from './controller/create-update-users.component';
import { NavbarComponent } from './controller/navbar.component';
import {ToastrModule} from "ngx-toastr";
import {MomentModule} from "ngx-moment";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    CreateUpdateUsersComponent,
    NavbarComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
        MomentModule,
        MatToolbarModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
      MatNativeDateModule,
        MatInputModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatDatepickerModule
    ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
