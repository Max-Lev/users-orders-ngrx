import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideStore, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersReducer } from './app-store/users/user.reducer';
import { HttpClientModule } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './providers/users.effect';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({users:UsersReducer}, {}),
    BrowserAnimationsModule
  ],
  providers: [
    provideStore(),
    provideEffects(UsersEffects),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
