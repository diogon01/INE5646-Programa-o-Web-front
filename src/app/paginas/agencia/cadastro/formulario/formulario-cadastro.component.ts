import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MotorConsultaService} from "../../../../compartilhado/servico/motor-consulta.service";
import {IUnidadeFederativa} from "../../../../compartilhado/interface/IUnidadeFederativa";
import {IAgenciaEsfera, IAgenciaEsferaGrupo} from "../../interface/IAgenciaEsfera";
import {EsferaAgenciaService} from "../../../../compartilhado/servico/esfera-agencia.service";
import {IPais} from "../../../../compartilhado/interface/IPais";
import {PaisServico} from "../../../../compartilhado/servico/pais.servico";
import {PaisEnumeracao} from "../../../../compartilhado/enumeracao/pais";
import {AgenciaServico} from "../../servico/agencia.servico";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IAgencia} from "../../interface/IAgencia";
import {MaxSizeValidator} from "@angular-material-components/file-input";
import {Location} from '@angular/common';

@Component({
  selector: 'agencia-formulario-cadastro',
  templateUrl: './formulario-cadastro.component.html',
  styleUrls: ['./formulario-cadastro.component.scss']
})
export class FormularioCadastroComponent implements OnInit {

  _enviandoFormulario: boolean = false;
  _agenciaFormulario!: FormGroup;
  _agenciaFormularioImagem: FormControl = new FormControl();
  _unidadesFederativa: Array<IUnidadeFederativa> = [];
  _paises: Array<IPais> = [];
  _opcoesEsferaAgencia: Array<IAgenciaEsferaGrupo> = [];
  _cd_agencia: string | null;
  _agenciaImagemPermitida: Array<string | null>;
  public files: any;
  maxSize = 16;

  constructor(
    private fb: FormBuilder,
    private motorServico: MotorConsultaService,
    private esferaAgenciaServico: EsferaAgenciaService,
    private paisServico: PaisServico,
    private agenciaServico: AgenciaServico,
    private rotaAtiva: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _localizacao: Location,
  ) {

    this._cd_agencia = this.rotaAtiva.snapshot.paramMap.get('id');
    this._agenciaImagemPermitida = [null, ".png", "image/*"];
    this._agenciaFormulario = this.carregarFormulario();
    this._opcoesEsferaAgencia = this.carregarEsferas();
    this.carregarPaises();
    this._agenciaFormularioImagem = new FormControl(this.files, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ])
  }

  ngOnInit(): void {
    if (this._cd_agencia) {
      this.carregarAgencia(this._cd_agencia);
    }
    this.carregarPaises();

    this._agenciaFormularioImagem.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
    })
  }

  carregarFormulario(): FormGroup {
    return this.fb.group({
      no_agencia: [null, [Validators.required, Validators.maxLength(60)]],
      sgl_agencia: [null, [Validators.required, Validators.maxLength(8)]],
      nu_cnpj: [null, [Validators.maxLength(11), Validators.minLength(11)]],
      dsc_email: [null, [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]],
      nu_telefone: [null, [Validators.maxLength(14), Validators.minLength(10)]],
      dsc_informacao: [null, []],
      url_imagem: [null, []],
      st_ativo: [true, []],
      agencia_esfera: new FormGroup({
        cd_esfera_agencia: new FormControl([null, Validators.required]),
        dsc_esfera_agencia: new FormControl([null, [Validators.required]])
      }),
      uf: new FormGroup({
        cd_uf: new FormControl([null, Validators.required]),
        dsc_uf: new FormControl([null, [Validators.required]])
      }),
      pais: new FormGroup({
        cd_pais: new FormControl([null, Validators.required]),
        no_pais: new FormControl([null, [Validators.required]])
      })
    });
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

  carregarAgencia(cd_agencia: string): void {
    this.agenciaServico.buscar(cd_agencia)
      .subscribe(agencia => {
        /*this._agenciaFormulario.addControl('cd_agencia',
          new FormControl([agencia.cd_agencia, Validators.required]));*/
        this._agenciaFormulario.patchValue(agencia);
        console.log(this._agenciaFormulario);
      })
  }

  selecionarEsfera(esfera: IAgenciaEsfera): void {
    if (esfera.cd_esfera_agencia !== 5) {
      this.pais.disable();
      this.pais.controls['cd_pais'].setValue(PaisEnumeracao.BRASIL);
      this.pais.controls['no_pais'].setValue('BRASIL')
      this.carregarUnidadesFederativa();
    }
    this.esfera.patchValue(esfera);
  }

  carregarEsferas(): Array<IAgenciaEsferaGrupo> {
    return this.esferaAgenciaServico.carregarEsfera();
  }

  agenciaEnviar(): void {
    this._enviandoFormulario = true;

    if (this._cd_agencia) {
      const cd_agencia = this._cd_agencia;
      this.agenciaServico.atualizar(this._agenciaFormulario, cd_agencia)
        .subscribe(retorno => {
        }, error => {
        }, () => {
          this._enviandoFormulario = false;
        });
    } else {
      this.agenciaServico.inserir(this._agenciaFormulario.getRawValue())
        .subscribe((retorno: IAgencia) => {
          if (this._agenciaFormularioImagem.dirty) {
            this.agenciaServico.inserirImagem(this._agenciaFormularioImagem.value)
              .subscribe(retorno => {
                console.log(retorno);
              })
          }
        }, error => {
        }, () => {
          this._enviandoFormulario = false;
        });
    }
  }

  agenciaInserirComImagem(): void {
    this.agenciaServico.inserirComImagem(this._agenciaFormulario, this._agenciaFormularioImagem)
      .subscribe((retorno: IAgencia) => {
        console.log(retorno);
      }, error => {
      }, () => {
        this._enviandoFormulario = false;
      });
  }

  selecionarUf(unidade: IUnidadeFederativa): void {
    this.uf.patchValue({
      cd_uf: unidade.id,
      dsc_uf: unidade.dsc_uf
    })
  }

  selecionarPais(pais: IPais) {

  }

  teste(evento: File[]): void {
    console.log(evento);
  }

  get esfera(): FormGroup {
    return this._agenciaFormulario.controls['agencia_esfera'] as FormGroup;
  }

  get pais(): FormGroup {
    return this._agenciaFormulario.controls['pais'] as FormGroup;
  }

  get uf(): FormGroup {
    return this._agenciaFormulario.controls['uf'] as FormGroup;
  }

  get url_image(): FormControl {
    return this._agenciaFormulario.controls['url_imagem'] as FormControl;
  }

  get agenciaImagem(): FormControl {
    return this._agenciaFormularioImagem as FormControl;
  }

  get titulo(): string {
    return this.rotaAtiva.snapshot.data['titulo'];
  }

  carregarImagem(evento: Event) {
    console.log(evento);
  }

  voltar(): void {
    this._localizacao.back();
  }
}
