import { Component,
         OnInit,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework/rc-cover'
import { ListRooms, ChatroomInfo }                from 'src/shared'

@Component({
  selector    : 'cover-chatroom-list',
  templateUrl : './chatroom-list.component.html',
  styleUrls   : ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit {

  header    : string
  chatRooms : ChatroomInfo[]

  constructor(@Inject('RunContext') public rc : RunContext) {
    this.header = 'ChatRooms'
  }

  ngOnInit() {

    this.rc.xmn.sendEvent(ListRooms.name)
  }

  listRooms(event: any) {
    
    const chatRooms: ChatroomInfo[] = event.detail.rooms
    
    this.chatRooms.push(...chatRooms)
  }



}
