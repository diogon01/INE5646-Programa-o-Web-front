import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IUnidadeFederativa} from "../../../../compartilhado/interface/IUnidadeFederativa";
import {IMunicipio} from "../../../../compartilhado/interface/IMunicipio";
import {IPais} from "../../../../compartilhado/interface/IPais";
import {IAgenciaEsferaGrupo} from "../../interface/IAgenciaEsfera";
import {MotorConsultaService} from "../../../../compartilhado/servico/motor-consulta.service";
import {EsferaAgenciaService} from "../../../../compartilhado/servico/esfera-agencia.service";
import {PaisServico} from "../../../../compartilhado/servico/pais.servico";
import {PaisEnumeracao} from "../../../../compartilhado/enumeracao/pais";

@Component({
  selector: 'agencia-formulario',
  templateUrl: './formulario-agencia.component.html',
  styleUrls: ['./formulario-agencia.component.scss']
})
export class FormularioAgenciaComponent implements OnInit, OnChanges {

  @Input()  formularioAgencia!: FormGroup;
  @Output() onFormGroupChange = new EventEmitter<any>();

  _enviandoFormulario: boolean = false;
  _unidadesFederativa: Array<IUnidadeFederativa> = [];
  _municipiosUF: Array<IMunicipio> = [];
  _paises: Array<IPais> = [];
  _opcoesEsferaAgencia: Array<IAgenciaEsferaGrupo> = [];

  constructor(
    private fb: FormBuilder,
    private motorServico: MotorConsultaService,
    private esferaAgenciaServico: EsferaAgenciaService,
    private paisServico: PaisServico,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

    this.onFormGroupChange.emit(this.formularioAgencia.getRawValue());
    this.carregarFormulario();
  }

  ngOnChanges() {
    this.ref.detectChanges()
  }

  protected carregarFormulario(): void {

    this.formularioAgencia.addControl('no_agencia',
      new FormControl(null, [Validators.required, Validators.maxLength(60)]));
    this.formularioAgencia.addControl('sgl_agencia',
      new FormControl(null, [Validators.required, Validators.maxLength(60)]));
    this.formularioAgencia.addControl('nu_cnpj',
      new FormControl(null, [Validators.required, Validators.maxLength(60)]));
    this.formularioAgencia.addControl('dsc_email',
      new FormControl(null, [Validators.required, Validators.maxLength(60)]));
    this.formularioAgencia.addControl('dsc_informacao',
      new FormControl(null, [Validators.required, Validators.maxLength(60)]));
    this.formularioAgencia.addControl('cd_esfera_agencia',
      new FormControl(null, [Validators.required, Validators.maxLength(60)]));
    this.formularioAgencia.addControl('url_imagem',
      new FormControl(null, [Validators.required, Validators.maxLength(60)]));
    this.formularioAgencia.addControl('st_ativo',
      new FormControl(null, [Validators.required, Validators.maxLength(60)]));
    this.formularioAgencia.addControl('fk_esfera_agencia',
      new FormControl(null, [Validators.required, Validators.maxLength(60)]));
    this.formularioAgencia.addControl('fk_uf',
      new FormControl(null, [Validators.required, Validators.maxLength(60)]));
    this.formularioAgencia.addControl('fk_pais',
      new FormControl(null, [Validators.required, Validators.maxLength(60)]));
     /*this.fb.group({
      no_agencia: [null, [Validators.required, Validators.maxLength(60)]],
      sgl_agencia: [null, [Validators.required, Validators.maxLength(8)]],
      nu_cnpj: [null, [Validators.maxLength(18), Validators.minLength(18)]],
      dsc_email: [null, [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]],
      nu_telefone: [null, [Validators.maxLength(14), Validators.minLength(10)]],
      dsc_informacao: [null, [Validators.required]],
      cd_esfera_agencia: [null, [Validators.required]],
      url_imagem: [null, [Validators.required]],
      st_ativo: [true, []],
      fk_esfera_agencia: [null, [Validators.required]],
      fk_uf: [null, [Validators.required]],
      fk_pais: [null, [Validators.required]],
    });*/
  }

  carregarUnidadesFederativa(): void {
    this.motorServico.pesquisarUf()
      .subscribe(unidadesFederativas => {
        this._unidadesFederativa = unidadesFederativas;
      }, error => {
        console.log(error);
      }, () => {
      });
  }

  carregarPaises(): void {
    this.paisServico.getAll()
      .subscribe(paises => {
        this._paises = paises;
      }, error => {
        console.log(error);
      }, () => {
      });
  }

  get esfera(): AbstractControl {
    return this.formularioAgencia.controls['cd_esfera_agencia'];
  }

  get pais(): AbstractControl {
    return this.formularioAgencia.controls['fk_pais'];
  }


  selecionarEsfera(formularioAgencia: FormGroup): void {
    if (this.esfera.value === 5) {
      console.log('internacional')
    } else {
      this.pais.disable();
      this.pais.setValue(PaisEnumeracao.BRASIL);
      this.carregarUnidadesFederativa();
    }
  }

  carregarMunicipiosUF(id: number): void {
    this.motorServico.pesquisarMunicipioUF(id)
      .subscribe(municipios => {
        this._municipiosUF = municipios;
      }, error => {
        console.log(error);
      }, () => {
      });
  }

  carregarEsferas(): Array<IAgenciaEsferaGrupo> {
    return this.esferaAgenciaServico.carregarEsfera();
  }

  onSubmit(): void {
    alert('Thanks!');
  }
}
