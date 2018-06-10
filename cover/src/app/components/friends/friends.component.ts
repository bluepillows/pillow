import { Component,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework'
import { COMPONENT_TYPE }                         from 'src/app/cover.component'

@Component({
  selector: 'cover-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {

  myName: string

  constructor(@Inject('RunContext') private rc : RunContext) {
    
  }

  saveName() {
    if (!this.myName || !this.myName.length) return

    this.rc.senderName = this.myName

    this.rc.coRouter.getCover().componentType = COMPONENT_TYPE.CHAT

  }

}
