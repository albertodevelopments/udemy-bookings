import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import * as _ from 'lodash'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(infoLogin: any): Observable<boolean>{
    let headers = new HttpHeaders()
    headers.set('Content-type', 'application/json')

    const url = 'https://booking-app-77112.firebaseio.com/users.json'

    return this.http.get<boolean>(url, {headers}).pipe(
      map(users => {

        const user = _.find(users, u => u.user === infoLogin.user && u.pass == infoLogin.pass)

        return user
      })
    )
  }

  isAuthenticated(){
    return localStorage.getItem('logged')
  }
}
