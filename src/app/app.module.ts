import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideStore, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { usersEntityReducer } from './app-store/user-entity/user-entity.reducer';
import { usersLoadReducer } from './app-store/users/user.reducer';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { MatNativeDateModule } from '@angular/material/core';

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
  ],
  providers: [
    // provideStore(),
    // provideEffects(UserEffects),
    provideStore({
      usersEntityState: usersEntityReducer,
      usersLoadState:usersLoadReducer,
    }),
    importProvidersFrom(MatNativeDateModule)
    // provideEffects(UserEffects),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
