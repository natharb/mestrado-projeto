import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Http,Response,Headers,RequestOptions, URLSearchParams } from "@angular/http";
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase/app'
import 'firebase/storage'
import { environment } from '../environments/environment';
import { Observable } from "rxjs";

declare var $:any;
declare var recorderObject: any;
declare function startRecording(button) : void;
declare function stopRecording(button, id) : void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isOn:boolean;
  isOff:boolean;

  constructor(
  ) {}

  ngOnInit() {
    this.isOn = false;
    this.isOff = true;
    recorderObject.recorder();
  }

  public start(button){
    startRecording(button);
    this.isOn = true;
    this.isOff = false;
  }

  public stop(id, button){
    stopRecording(button, id);
    this.isOn = false;
    this.isOff = true;
  }
}

