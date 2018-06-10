import { Component, OnInit, Inject } from '@angular/core';
import { RunContext } from '../../framework';
import { ChatService } from '../../services/chat.service';
import { MessageInfo } from '../../../shared';

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
    
    const message = this.newMessage
    this.chatService.sendMessage(message)
    this.newMessage = null
  }

}
