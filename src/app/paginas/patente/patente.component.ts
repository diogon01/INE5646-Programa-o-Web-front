import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-patente',
  templateUrl: './patente.component.html',
  styleUrls: ['./patente.component.scss']
})
export class PatenteComponent implements OnInit {

  constructor(private rota: Router) {
  }

  ngOnInit(): void {
  }

}
