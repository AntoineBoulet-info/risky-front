import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {MessageService} from 'primeng/api';



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

  /*private refreshTokenTimeout : any;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(ANONYMOUS_USER);
  private currentUserSubject: BehaviorSubject<User>;
  public user$: Observable<User> = this.userSubject.asObservable();


  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => {
    console.log('isLoggedIn$ ? ', user.id, ' ', (!!user.id ? 'Oui' : 'Non'));
    return !!user.id;
  }));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private router: Router, private http: HttpClient, private messageService: MessageService) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
  }

  public get userValue(): User {
    return this.userSubject.value;
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  createUser(email: string, password: string): Observable<any> {
    console.log('Create User');
    return this.http.post<any>(`${environment.apiUrl}/sign-up`, {email, password}, httpOptions)
      .pipe(
        tap(rep => console.log(rep)),
        map(rep => {
          const user = {user: rep.data.value, jwtToken: rep.data.token};
          console.log('User registered: ', user);
          return user;
        }),
        shareReplay(),
        catchError(err => {
          this.userSubject.next(ANONYMOUS_USER);
          return throwError('bug');
          // return of('');
        }));
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, {email, password}, httpOptions)
      .pipe(
        tap(rep => console.log(rep)),
        map(rep => {
          const user = {...rep.data.user, jwtToken: rep.data.token};
          console.log('User connected : ', user);
          this.userSubject.next(user);
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('token', rep.data.token);
          return user;
        }),
        shareReplay(),
        catchError(err => {
          this.userSubject.next(ANONYMOUS_USER);
          alert('Il semble que vous ne soyez pas inscrit ou que votre mot de passe est incorrect');
          return throwError('bug');
          // return of('');
        }));
  }

  logout(): void {
    const oldUser = this.userValue;
    this.http.post<any>(`${environment.apiUrl}/logout`, {}, httpOptions).subscribe(
      () => this.messageService.add({
        severity: 'info',
        summary: 'Déconnexion',
        key: 'main'
      })
    );
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    this.userSubject.next(ANONYMOUS_USER);

    this.router.navigate(['/home']);
  }*/


  constructor(private http: HttpClient) { }
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
