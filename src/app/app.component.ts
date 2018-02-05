import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase/app'
import 'firebase/storage'
import { Observable } from "rxjs";
var $: any;
declare var recorderObject: any;
declare function startRecording(button,id): void;
declare function stopRecording(button, id,count): void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isOn: boolean;
  isOff: boolean;

  count:number = 0; //inicializando o contador.

  userForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.userForm = fb.group({
      'idade': [null, [Validators.required, Validators.min(1),Validators.max(100)]],
      'estado': [null, Validators.required],
      'cidade': [null, Validators.required],
      'sexo': [null, Validators.required],
      'escolaridade': '',
      'data': ''
    })
  }

  IsHidden = true;
  onSelect() {
    this.IsHidden = !this.IsHidden;
  }


  onSelectFrase(showHideDiv) {
    for (let i = 1; i <= 17; i++) {
      if (showHideDiv == 'frase' + i) {
        document.getElementById("frase" + i).style.display = "none";
        document.getElementById("frase" + (i + 1)).style.display = "block";
      }
    }
  }

  onSelectFraseVoltar(showBackDiv) {
    for (let i = 2; i <= 17; i++) {
      if (showBackDiv == 'frase' + (i-1)) {
        document.getElementById("frase" + i).style.display = "none";
        document.getElementById("frase" + (i - 1)).style.display = "block";
      }
    }
  }
  
  onSubmit(value: any): void {
    console.log('you submitted value:', value);
  }

  ngOnInit() {
    this.isOn = false;
    this.isOff = true;
    recorderObject.recorder();
  }

  public start(id,button) {
    startRecording(button,id);
    this.isOn = true;
    this.isOff = false;
  }

  public stop(id, button) {
    this.count +=1;
    stopRecording(button, id,this.count);
    this.isOn = false;
    this.isOff = true;
  }
  
}

