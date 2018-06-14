import { Component,
         Inject,
         OnInit }                                 from '@angular/core'
import { API_STATE }                              from 'src/app/framework/api-state'
import { RunContext }                             from 'src/app/framework/rc-cover'
import { MessageInfo }                            from 'src/shared/pillow-types'

export enum COMPONENT_TYPE {
  LOGIN = 'login',
  CHAT  = 'chat'
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
  componentType  : COMPONENT_TYPE        = COMPONENT_TYPE.LOGIN

  nightMode      : boolean               = false // WASP : store this in localstorage
  messages       : MessageInfo[]         = []


  constructor(@Inject('RunContext') private rc: RunContext) { }


  ngOnInit() {

    this.rc.coRouter.registerCover(this)

    this.handleUser()
  }

  private handleUser() {

    if (!this.rc.userKeyValue.name) {
      this.componentType = COMPONENT_TYPE.LOGIN
    } else {
      this.componentType = COMPONENT_TYPE.CHAT
    }
  }

  signOut() {
    
    this.rc.userKeyValue.name = null
    this.componentType        = COMPONENT_TYPE.LOGIN
  }

}
