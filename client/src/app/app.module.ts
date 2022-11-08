import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmExampleComponent } from './agm-example/agm-example.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { LoginComponent } from './login/login.component';
import { config } from './default';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LandPurchaseComponent } from './land-purchase/land-purchase.component';


@NgModule({
  declarations: [
    AppComponent,
    AgmExampleComponent,
    LoginComponent,
    LandPurchaseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    HttpClientModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: config.api,
      libraries: ['places', 'drawing', 'geometry']
    }),
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
