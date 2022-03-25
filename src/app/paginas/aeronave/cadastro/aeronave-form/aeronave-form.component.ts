import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {AeronaveService} from "../../servico/aeronave.service";
import {IBateria} from "../../interface/IBateria";

@Component({
  selector: 'aeronave-formulario',
  templateUrl: './aeronave-form.component.html',
  styleUrls: ['./aeronave-form.component.scss']
})
export class AeronaveFormComponent implements OnInit {


  _baterias: Array<IBateria> = [];
  _id: string | null;

  _aeronaveFormulario = this.fb.group({
    model: [null, Validators.required],
    weight: [null, Validators.required],
    max_payload: [null, Validators.required],
    ip_rating: [null, Validators.required],
    max_flight_time: [null, Validators.required],
    charger_id: [null, Validators.required]
  });

  hasUnitNumber = false;


  constructor(private fb: FormBuilder,
              private rotaAtiva: ActivatedRoute,
              private aeronaveServico: AeronaveService,
              private rota: Router) {
    this._id = this.rotaAtiva.snapshot.paramMap.get('id');
  }


  get titulo(): string {
    return this.rotaAtiva.snapshot.data['titulo'];
  }

  ngOnInit(): void {
    if(this._id){
      this.carregarAeronave(this._id);
    }
    this.carregarBaterias();
  }

  onSubmit(): void {
    if(this._id){
      this.aeronaveServico.editar(this._aeronaveFormulario.value, this._id)
        .subscribe(aeronave=>{
          this.rota.navigate(['aeronave'])
            .then(() => {
            });
        }, erro=>{
          console.log(erro);
        }, ()=>{

        });
    }else {
      this.aeronaveServico.salvar(this._aeronaveFormulario.value)
        .subscribe(aeronave=>{
          this.rota.navigate(['aeronave'])
            .then(() => {
            });
        }, erro=>{
          console.log(erro);
        }, ()=>{

        });
    }
  }

  carregarBaterias(): void {
    this.aeronaveServico.listarBaterias()
      .subscribe(baterias => {
        this._baterias = baterias;
      }, erro => {
        console.log(erro);
      }, () => {

      })
  }




  get bateria(): FormGroup {
    return this._aeronaveFormulario.controls['bateria'] as FormGroup;
  }


  selecionarBateria(bateria: IBateria) {
    this.bateria.patchValue(bateria);
    console.log(this.bateria);
  }

  private carregarAeronave(id: string) {
    this.aeronaveServico.carregar(id)
      .subscribe(aeronave=>{
        this._aeronaveFormulario.patchValue(aeronave);
        console.log(this._aeronaveFormulario);
      }, erro=>{

      }, ()=>{})

  }
}
