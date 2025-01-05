import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideStore, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { UsersReducer } from './app-store/users/user.reducer';
import { HttpClientModule } from '@angular/common/http';
// import { userReducer } from './app-store/users/user.reducer';
import { provideEffects } from '@ngrx/effects';
// import { UserEffects } from './providers/users.effect';
import { usersEntityReducer } from './app-store/user-entity/user-entity.reducer';
import{UsersEntityState} from './app-store/user-entity/user-entity.reducer';
import { usersLoadReducer } from './app-store/users/user.reducer';
// import { selectUserState } from './app-store';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // StoreModule.forFeature(usersFeatureKey, usersFeature.reducer),
    // StoreModule.forRoot({users: usersReducer}, {}),
    BrowserAnimationsModule
  ],
  providers: [
    // provideStore(),
    // provideEffects(UserEffects),
    provideStore({
      usersEntityState: usersEntityReducer,
      usersLoadState:usersLoadReducer,
    }),
    // provideEffects(UserEffects),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
