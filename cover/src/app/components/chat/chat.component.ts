import { Component,
         OnInit,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework/rc-cover'
import { ChatService }                            from 'src/app/services/chat.service'
import { MessageInfo }                            from 'src/shared'

@Component({
  selector    : 'cover-chat',
  templateUrl : './chat.component.html',
  styleUrls   : ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  header       : string
  chatMessages : MessageInfo[] = []
  newMessage   : string

  constructor(@Inject('RunContext') private rc : RunContext,
              private chatService              : ChatService) {

  }

  ngOnInit() {

    this.initUi()
  }

  initUi() {
    this.header = 'Chatroom'
  }

  sendMessage() {

    const text = this.newMessage
    this.chatService.sendMessage(text)
    this.newMessage = null
  }

  messageReceived(event: any) {

    console.log(`wasp > messageReceived > event: ${JSON.stringify(event.detail)}`)

    const message: MessageInfo = event.detail.message
    this.chatMessages.push(message)

    console.log(`wasp > messageReceived > chatMessages: ${JSON.stringify(this.chatMessages)}`)
  }

}
