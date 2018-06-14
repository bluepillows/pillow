// ANGULAR MODULES
import { BrowserModule }                          from '@angular/platform-browser'
import {BrowserAnimationsModule}                  from '@angular/platform-browser/animations'
import { NgModule }                               from '@angular/core'
import { FormsModule }                            from '@angular/forms'
import { MatToolbarModule,
         MatButtonModule, 
         MatIconModule, 
         MatMenuModule,
         MatInputModule }                          from '@angular/material'


// COMPONENTS
import { CoverComponent }                         from './cover.component'
import { LoginComponent }                         from './components/login/login.component'
import { ChatComponent }                          from './components/chat/chat.component'
import { IntroComponent }                         from './components/intro/intro.component'


// SERVICES



//DIRECTIVES
import { CoAutoFocusDirective }                   from './directives'


// PIPES
import { ExtractInitialPipe }                     from './pipes';
import { ChatroomListComponent } from './components/chatroom-list/chatroom-list.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component'


@NgModule({
  declarations: [
    // components
    CoverComponent,
    LoginComponent,
    ChatComponent,

    // directives
    CoAutoFocusDirective,

    // pipes
    ExtractInitialPipe,

    IntroComponent,

    ChatroomListComponent,

    ChatroomComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [CoverComponent]
})
export class AppModule { }
