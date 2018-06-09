import { Component, OnInit, Inject } from '@angular/core';
import { RunContext } from '../../framework';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'cover-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message: string

  constructor(@Inject('RunContext') private rc : RunContext,
              private chatService              : ChatService) {

  }

  ngOnInit() {
    this.chatService.getMessages().subscribe(message => {
      console.log(`wasp > chat > ngOnInit > message : ${message}`)
    })
  }

  sendMessage() {
    const message = this.message
    this.chatService.sendMessage(message)
    this.message = null
  }

}
