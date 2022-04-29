import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  /** Service d'authentification
   * Méthodes connexion, jeton JSON, création d'un profil et mot de passe oublié
   **/



  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/sign-up', {
      username,
      email,
      password
    }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(environment.apiUrl + '/refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }


}
