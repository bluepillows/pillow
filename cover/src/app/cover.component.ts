import { Component,
         Inject,
         OnInit }                                 from '@angular/core'
import { API_STATE }                              from 'src/app/framework/api-state'
import { RunContext }                             from 'src/app/framework/rc-cover'
import { MessageInfo,
         ChatroomInfo }                           from 'src/shared/pillow-types'

export enum COMPONENT_TYPE {
  LOGIN         = 'login',
  CHATROOM_LIST = 'chatroomList',
  CHATROOM      = 'chatroom',
  CHAT          = 'chat'
}

@Component({
  selector    : 'cover-root',
  templateUrl : './cover.component.html',
  styleUrls   : ['./cover.component.scss']
})

export class CoverComponent implements OnInit {

  API_STATE               : typeof API_STATE      = API_STATE
  apiState                : API_STATE

  COMPONENT_TYPE          : typeof COMPONENT_TYPE = COMPONENT_TYPE
  componentType           : COMPONENT_TYPE        = COMPONENT_TYPE.LOGIN

  nightMode               : boolean               = false // WASP : store this in localstorage
  messages                : MessageInfo[]         = []

  private currentChatRoom : ChatroomInfo          = null

  constructor(@Inject('RunContext') private rc: RunContext) { }

  ngOnInit() {

    this.rc.coRouter.registerCover(this)

    this.handleUser()
  }

  private handleUser() {

    this.componentType = this.rc.userKeyValue.name    ?
                         COMPONENT_TYPE.CHATROOM_LIST :
                         COMPONENT_TYPE.LOGIN
  }

  signOut() {
    
    this.rc.userKeyValue.name = null
    this.componentType        = COMPONENT_TYPE.LOGIN
  }

  getCurrentChatRoom(): ChatroomInfo {

    return this.currentChatRoom
  }

  setCurrentChatRoom(chatroom: ChatroomInfo) {

    this.currentChatRoom = chatroom
  }
}
