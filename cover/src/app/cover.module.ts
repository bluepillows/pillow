// ANGULAR MODULES
import { BrowserModule }                          from '@angular/platform-browser'
import { NgModule }                               from '@angular/core'
import { FormsModule }                            from '@angular/forms'
import { MatToolbarModule,
         MatButtonModule }                        from '@angular/material'

// COMPONENTS
import { CoverComponent }                         from './cover.component'
import { FriendsComponent } from './components/friends/friends.component'
import { ChatComponent } from './components/chat/chat.component'

// SERVICES


//DIRECTIVES


@NgModule({
  declarations: [
    CoverComponent,
    FriendsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [CoverComponent]
})
export class AppModule { }
