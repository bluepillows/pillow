import { Injectable,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(@Inject('RunContext') private rc: RunContext) {

  }

  sendMessage(message) {

    const senderName = this.rc.senderName
    this.rc.xmn.sendEvent('pillowMessage', {
      senderName,
      msg: message
    })
  }
  
  getMessages() {

    console.log(`wasp > getMessages`)

  }
  

}
