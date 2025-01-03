import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UsersState } from '../app-store/users/user.reducer';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly http = inject(HttpClient);

  constructor() { 

  }

  getUsers():Observable<UsersState[]>{
    return this.http.get<UsersState[]>(environment.getUsersApi)
  }


}
