import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase/app'
import 'firebase/storage'
//import {UserData} from './user.model';
import { Observable } from "rxjs";
var $: any;
declare var recorderObject: any;
declare function startRecording(button): void;
declare function stopRecording(button, id): void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isOn: boolean;
  isOff: boolean;

  fraseOn: boolean;
  fraseOff: boolean;

  currentPercentage: String;

  userForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.userForm = fb.group({
      'idade': [null, Validators.required],
      'estado': [null, Validators.required],
      'cidade': [null, Validators.required],
      'sexo': [null, Validators.required],
      'escolaridade': '',
      'data': ''
    })

    this.currentPercentage = '60';
  }

  sampleMethode(id) {
    if (id == 'frase1') {
      this.currentPercentage = '33.33';
    } else if (status === 'inprogress') {
      this.currentPercentage = '66.66';
    } else {
      this.currentPercentage = '100';
    }
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

  onSubmit(value: any): void {
    console.log('you submitted value:', value);
  }

  ngOnInit() {
    this.isOn = false;
    this.isOff = true;
    recorderObject.recorder();
  }

  public start(button) {
    startRecording(button);
    this.isOn = true;
    this.isOff = false;
  }

  public stop(id, button) {
    stopRecording(button, id);
    this.isOn = false;
    this.isOff = true;
  }
}

