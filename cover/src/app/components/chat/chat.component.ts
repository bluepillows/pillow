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

  userColorMap = {}

  constructor(@Inject('RunContext') public rc : RunContext,
              private chatService             : ChatService) {

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

    const message: MessageInfo = event.detail.message
    this.chatMessages.push(message)
  }

  signOut() {

    this.rc.coRouter.getCover().signOut()
  }

  // to assign a consistent random background color to each user
  getRandomColor(userName: string) {

    if (!this.userColorMap[userName]) {
      const min   = 0,
            max   = 255,
            red   = Math.floor(Math.random() * (max - min + 1)) + min,
            green = Math.floor(Math.random() * (max - min + 1)) + min,
            blue  = Math.floor(Math.random() * (max - min + 1)) + min,
            color = `rgb(${red}, ${green}, ${blue})`

      this.userColorMap[userName] = color
    }

    return this.userColorMap[userName]
  }

}
