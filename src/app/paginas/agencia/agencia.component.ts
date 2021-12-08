import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-agencia',
  templateUrl: './agencia.component.html',
  styleUrls: ['./agencia.component.scss']
})
export class AgenciaComponent implements OnInit {

  constructor(
    private rota: Router,
  ) { }

  ngOnInit(): void {

  }

}
