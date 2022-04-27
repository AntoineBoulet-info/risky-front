import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, shareReplay, take, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) {
  }

  






}

