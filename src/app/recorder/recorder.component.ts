import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Http,Response,Headers,RequestOptions, URLSearchParams } from "@angular/http";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";

declare var $:any;
declare var recorderObject: any;
declare function startRecording(button) : void;
declare function stopRecording(button, id) : void;

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit {
  isOn:boolean;
  isOff:boolean;

  constructor(  ) { }

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
