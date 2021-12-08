import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PatenteServico {

  _url: string = environment.api.url;

  constructor(
    private http: HttpClient,
    private barraDeAviso: MatSnackBar
  ) {
  }
}
