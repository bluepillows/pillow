import { Component,
         Inject, 
         OnInit }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework/rc-cover'
import { COMPONENT_TYPE }                         from 'src/app/cover.component'

@Component({
  selector    : 'cover-login',
  templateUrl : './login.component.html',
  styleUrls   : ['./login.component.scss']
})
export class LoginComponent {

  myName: string

  constructor(@Inject('RunContext') private rc : RunContext) {
    
  }

  saveName() {

    if (!this.myName || !this.myName.length) return

    this.rc.userKeyValue.name = this.myName

    this.rc.coRouter.getCover().componentType = COMPONENT_TYPE.CHATROOM_LIST
  }

}
