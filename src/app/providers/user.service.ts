import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { User, UserState } from '../app-store/users/user.reducer';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { User } from '../app-store/user-entity/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly http = inject(HttpClient);

  constructor() { 

  }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(environment.getUsersApi)
  }


}
