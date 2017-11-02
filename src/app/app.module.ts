import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
 
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { RecorderComponent } from './recorder/recorder.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'about', pathMatch: 'full' },  
  {path: 'about', component: AboutComponent },
  {path: 'user', component: UserComponent },
  {path: 'recorder', component: RecorderComponent }
];

@NgModule({
  declarations: [ 
    AppComponent,
    AboutComponent,
    UserComponent,
    RecorderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  bootstrap: [AppComponent],

  providers: [],


})
export class AppModule { }
