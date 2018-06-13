import { Injectable,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework/rc-cover'
import { MessageInfo }                            from 'src/shared'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(@Inject('RunContext') private rc: RunContext) {

  }

  sendMessage(text) {
    const ts = Date.now()

    const message: MessageInfo = {
      text         : text,
      senderName   : this.rc.senderName,
      sentTs       : ts
    }

    this.rc.xmn.sendEvent('messageIO', {
      message
    })
  }

}
