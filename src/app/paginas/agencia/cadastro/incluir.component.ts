import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.scss']
})
export class IncluirComponent implements OnInit {

  constructor(
    private rotaAtiva: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  get titulo(): string {
    return this.rotaAtiva.snapshot.data['titulo'];
  }

}
