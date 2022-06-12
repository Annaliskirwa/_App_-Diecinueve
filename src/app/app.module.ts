import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-zuzrkzsf.us.auth0.com',
      clientId: '5rvKpFd6SH5frjiiPDuYrMcnprDvnlPM'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
