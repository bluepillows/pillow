import { Injectable,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework/rc-cover'
import { MessageInfo,
         MessageIO }                              from 'src/shared'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(@Inject('RunContext') private rc: RunContext) { }

  sendMessage(text) {

    const ts = Date.now()

    const message: MessageInfo = {
      text         : text,
      senderName   : this.rc.userKeyValue.name,
      sentTs       : ts
    }

    this.rc.xmn.sendEvent(MessageIO.name, {
      message
    })
  }

}
