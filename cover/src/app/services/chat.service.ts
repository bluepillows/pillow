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
      mid          : ts,
      text         : text,
      senderId     : null,
      senderName   : this.rc.senderName,
      receiverId   : null,
      receiverName : null,
      sentTs       : ts
    }

    this.rc.xmn.sendEvent('pillowMessage', {
      message
    })
  }

}
