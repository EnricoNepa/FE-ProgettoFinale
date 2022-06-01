import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Comune } from 'src/app/models/comune';
import { Provincia } from 'src/app/models/provincia';
import { AuthService } from 'src/app/services/auth.service';
import { ClientiService } from 'src/app/services/clienti.service';
import { ComuniService } from 'src/app/services/comuni.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-info-clienti',
  templateUrl: './info-clienti.component.html',
  styleUrls: ['./info-clienti.component.scss'],
})
export class InfoClientiComponent implements OnInit {
  form!: FormGroup;
  comuni!: Comune[];
  province!: Provincia[];
  tipiCliente!: any;
  clientId!: number;
  cliente!: Cliente;
  sub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private clientSrv: ClientiService,
    private comuneSrv: ComuniService,
    private provinciaSrv: ProvinceService,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nomeContatto: new FormControl(''),
      cognomeContatto: new FormControl(''),
      telefonoContatto: new FormControl(''),
      telefono: new FormControl(''),
      pec: new FormControl(''),

      tipoCliente: new FormControl('', [Validators.required]),
      emailContatto: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      partitaIva: new FormControl('', [Validators.required]),
      ragioneSociale: new FormControl('', [Validators.required]),

      indirizzoSedeOperativa: this.formBuilder.group({
        via: new FormControl(''),
        cap: new FormControl(''),
        civico: new FormControl(''),
        localita: new FormControl(''),
        comune: this.formBuilder.group({
          id: new FormControl('', Validators.required),
          nome: '',
          provincia: {},
        }),
      }),

      // indirizzoSedeLegale: this.formBuilder.group({
      //   via: new FormControl(''), //
      //   cap: new FormControl(''), //
      //   civico: new FormControl(''), //
      //   localita: new FormControl(''), //
      //   comune: this.formBuilder.group({
      //     id: new FormControl('', Validators.required), //
      //     nome: '',
      //     provincia: {},
      //   }),
      // }),
    });

    this.comuneSrv.getComuni().subscribe((res) => {
      this.comuni = res.content;
    });


    this.provinciaSrv.getProvince().subscribe((res) => {
      this.province = res.content;
    });

    this.clientSrv.getTipoCliente().subscribe((res) => {
      this.tipiCliente = res;
    });


    this.GetClientId();

    this.fillForm();
  }

  GetClientId() {
    this.sub = this.currentRoute.params.subscribe((res) => {
      this.clientId = +res['id'];
      console.log('Id del cliente corrente: ' + this.clientId);
    });
    return this.clientId;
  }
  submit(form:{value:{indirizzoSedeOperativa:{comune:Comune}}}) {
    console.log(form.value)

    this.comuni.forEach(comune=>{
      if(comune.id==form.value.indirizzoSedeOperativa.comune.id){
        form.value.indirizzoSedeOperativa.comune=comune;
      }
    })

    console.log(form.value)
    this.clientSrv.setCliente(form.value,this.clientId).subscribe(res=>{
      console.log(res)
    })
    console.log(this.form.value);
    this.form.reset;
  }

  restoreData(clientId: number) {
    this.clientSrv.getClientById(this.GetClientId()).subscribe((res) => {
      console.log(res);
      this.cliente = res;
      this.form.patchValue({
        nomeContatto: this.cliente.nomeContatto,
        cognomeContatto: this.cliente.cognomeContatto,
        telefonoContatto: this.cliente.telefonoContatto,
        telefono: this.cliente.telefono,
        pec: this.cliente.pec,

        tipoCliente: this.cliente.tipoCliente,
        emailContatto: this.cliente.emailContatto,
        email: this.cliente.email,
        partitaIva: this.cliente.partitaIva,
        ragioneSociale: this.cliente.ragioneSociale,

        indirizzoSedeOperativa: {
          via: this.cliente.indirizzoSedeOperativa.via,
          cap: this.cliente.indirizzoSedeOperativa.cap,
          civico: this.cliente.indirizzoSedeOperativa.civico,
          localita: this.cliente.indirizzoSedeOperativa.localita,
          comune: {
            id: this.cliente.indirizzoSedeOperativa.comune.id,
            provincia1: this.cliente.indirizzoSedeOperativa.comune.provincia.id,
          },
        },

        // indirizzoSedeLegale: {
        //   via: this.cliente.indirizzoSedeLegale.via,
        //   cap: this.cliente.indirizzoSedeLegale.cap,
        //   civico: this.cliente.indirizzoSedeLegale.civico,
        //   localita: this.cliente.indirizzoSedeLegale.localita,
        //   comune: {
        //     id: this.cliente.indirizzoSedeLegale.comune.id,
        //     provincia: this.cliente.indirizzoSedeLegale.comune.provincia.id,
        //   },
        // },
      });
    });
  }

  fillForm() {
    if (this.clientId != 0) {
      this.restoreData(this.clientId);
    }
  }

  alert(){
    alert("MODIFICHE EFFETTUATE!✅")
  }
}
