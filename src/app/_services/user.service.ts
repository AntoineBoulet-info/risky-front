import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {User} from '../_models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** Service Utilisateur
   **/

 /* // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}
  // Add
  AddUser(data: User): Observable<any> {
    let API_URL = `${environment.apiUrl}/sign-up`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));

  }

  // Get all objects
  GetUsers() {
    return this.httpClient.get(`${environment.apiUrl}`);
  }
  // Get single object
  GetUser(id: any): Observable<any> {
    let API_URL = `$${environment.apiUrl}/login/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Update
  updateUser(id: any, data: any): Observable<any> {
    let API_URL = `${environment.apiUrl}/update-book/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  // Delete
  deleteUser(id: any): Observable<any> {
    let API_URL = `${environment.apiUrl}/delete-book/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }*/

  constructor(private http: HttpClient) { }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }
  get(id: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/user-profile/' + id)
  }
  create(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users`, data);
  }


}
