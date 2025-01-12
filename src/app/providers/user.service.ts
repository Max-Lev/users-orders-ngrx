import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { User } from '../app-store/users-entity/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly http = inject(HttpClient);

  getUsers$():Observable<User[]>{
    return this.http.get<User[]>(environment.getUsersApi);
  }

  getUser$(id:number):Observable<User[]>{
    return this.http.get<User[]>(environment.getUsersApi,{params:{id:id}});
  }


}
