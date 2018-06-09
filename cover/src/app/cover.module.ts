import { BrowserModule }                          from '@angular/platform-browser'
import { NgModule }                               from '@angular/core'
import { FormsModule }                                  from '@angular/forms'

import { CoverComponent }                         from './cover.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ChatComponent } from './components/chat/chat.component'

@NgModule({
  declarations: [
    CoverComponent,
    FriendsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [CoverComponent]
})
export class AppModule { }
