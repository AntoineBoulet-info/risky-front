import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";

import {environment} from "../../environments/environment";
import {Ia} from "../_models/ia";


@Injectable({
  providedIn: 'root'
})


export class IaService {

  constructor(private http: HttpClient) {
  }

  /**
   * Méthode qui appelle le JSON de l'IA 1
   */
  getIA1(): Observable<Ia[]> {
    return this.http.get<Ia[]>(`${environment.apiUrl}/IA1`);
  }

  /**
   * Méthode qui appelle le JSON de l'IA 2
   */
  getIA2(): Observable<Ia[]> {
    return this.http.get<Ia[]>(`${environment.apiUrl}/IA2`);
  }


}
