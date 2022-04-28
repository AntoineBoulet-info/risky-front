import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {User} from "../_models/user";
import {environment} from "../../environments/environment";
import {Ia} from "../_models/ia";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})



export class IaService {

  constructor(private http: HttpClient) {
  }

  getIA1(): Observable<Ia[]> {
    return this.http.get<Ia[]>(`${environment.apiUrl}/IA1`);
  }

  getIA2(): Observable<Ia[]> {
    return this.http.get<Ia[]>(`${environment.apiUrl}/IA2`);
  }

  getIA1Json(): Observable<Ia[]> {
    const url = environment.apiUrl + '/IA1';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    // @ts-ignore
    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.item),
        tap(val => console.log(val)),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }

}
