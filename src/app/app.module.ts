import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideStore, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { usersEntityReducer } from './app-store/users-entity/users-entity.reducer';
import { usersLoadReducer } from './app-store/users/user.reducer';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.development';

@NgModule({
  declarations: [
    AppComponent,
    // UsersTableComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // StoreModule.forFeature(usersFeatureKey, usersFeature.reducer),
    // StoreModule.forRoot({users: usersReducer}, {}),
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.development }),
  ],
  providers: [
    // provideStore(),
    // provideEffects(UserEffects),
    provideStore({
      users: usersEntityReducer,
      usersLoadState:usersLoadReducer,
    }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.development, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      // connectInZone: true // If set to true, the connection is established within the Angular zone
    })
    // importProvidersFrom(MatNativeDateModule)
    // provideEffects(UserEffects),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
