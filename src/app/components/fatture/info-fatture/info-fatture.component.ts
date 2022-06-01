import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fattura } from 'src/app/models/fattura';
import { FattureService } from 'src/app/services/fatture.service';

@Component({
  selector: 'app-info-fatture',
  templateUrl: './info-fatture.component.html',
  styleUrls: ['./info-fatture.component.scss'],
})
export class InfoFattureComponent implements OnInit {
  form!: FormGroup;
  sub!: Subscription;
  fattura_ID!: number;
  checkFatt!: boolean;
  statiFatt!: any;
  fattura!: Fattura;
  clienteId!: number;
  constructor(
    private formBuilder: FormBuilder,
    private currentRoute: ActivatedRoute,
    private fatturaSrv: FattureService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      data: new FormControl('', [Validators.required]),
      numero: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      anno: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{4}$'),
      ]),
      importo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9.]*$'),
      ]),
      stato: new FormControl('', [Validators.required]),
    });

    this.fatturaSrv.getStatiFattura().subscribe((res) => {
      this.statiFatt = res.content;
      console.log(this.statiFatt);
    });


    this.fattura_ID = 0;

    this.GetFatturaId();

    this.getClienteId();

    this.checkfattura_ID(this.fattura_ID);


    if (this.checkFatt) {
      this.form.disable();
      this.form.controls['stato'].enable();
    } else {
      this.form.enable();
    }


    this.fillForm()
  }

  submit(form: {
    value: {
      data: string;
      numero: number;
      anno: number;
      importo: number;
      stato: number;
    };
  }) {
    console.log(form.value);
    if (this.fattura_ID == 0) {
      this.fattura = {
        id: 0,
        anno: 0,
        numero: 0,
        data: new Date,
        importo: 0,
        stato: { id: 0, nome: '' },
        cliente: {},
      };
    }
    this.fattura.id = this.fattura_ID;
    this.fattura.data = form.value.data;
    this.fattura.numero = form.value.numero;
    this.fattura.anno = form.value.anno;
    this.fattura.importo = form.value.importo;
    this.fattura.stato.id = form.value.stato;
    if (this.clienteId) { this.fattura.cliente.id = this.clienteId }
    this.fatturaSrv.setFattura(this.fattura_ID, this.fattura).subscribe(res => {
      console.log(res)
      if (this.clienteId) { this.router.navigate(['/clienti/fatture', this.clienteId]) } else {
        this.router.navigate(['/fatture'])
      }
    })
  }
  GetFatturaId() {
    this.sub = this.currentRoute.params.subscribe((res) => {
      this.fattura_ID = +res['id'];
      console.log(res);
      console.log(this.fattura_ID);
    });
    return this.fattura_ID;
  }
  getClienteId() {
    this.sub = this.currentRoute.params.subscribe(res => {
      this.clienteId = +res['idCliente']
    })
  }
  checkfattura_ID(id: number) {
    if (id != 0) {
      this.checkFatt = true;
    } else {
      this.checkFatt = false;
    }
  }
  restoreData(fatturaId: number) {
    this.fatturaSrv.getFattureById(fatturaId).subscribe(res => {
      console.log(res);
      this.fattura = res;
      this.form.patchValue({
        data: this.fattura.data,
        numero: this.fattura.numero,
        anno: this.fattura.anno,
        importo: this.fattura.importo,
        stato: this.fattura.stato.id
      })
    })
  }


  fillForm() {
    if (this.fattura_ID != 0) {
      console.log(this.fattura_ID)
      this.restoreData(this.fattura_ID);
    }
  }
}
