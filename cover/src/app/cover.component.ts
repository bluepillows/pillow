
import { Component,
         Inject,
         OnInit }                                 from '@angular/core'
import { API_STATE }                              from './framework/api-state'
import { RunContext }                             from './framework'
import { FriendsService }                         from 'src/app/services/friends.service'
import { MessageInfo }                            from 'src/shared/pillow-types'

enum COMPONENT_TYPE {
  FRIENDS = 'friends',
  CHAT    = 'chat'
}

@Component({
  selector    : 'cover-root',
  templateUrl : './cover.component.html',
  styleUrls   : ['./cover.component.scss']
})

export class CoverComponent implements OnInit {

  API_STATE      : typeof API_STATE      = API_STATE
  apiState       : API_STATE

  COMPONENT_TYPE : typeof COMPONENT_TYPE = COMPONENT_TYPE
  componentType  : COMPONENT_TYPE        = COMPONENT_TYPE.CHAT

  nightMode      : boolean               = false // WASP : store this in localstorage

  messages       : MessageInfo[]         = []


  constructor(@Inject('RunContext') private rc: RunContext,
              private friendsService: FriendsService) {
    
  }


  ngOnInit() {

    this.rc.xmn.sendEvent('event1', {
      msg: 'Client to server, can you hear me server?'
    })
  }
}
