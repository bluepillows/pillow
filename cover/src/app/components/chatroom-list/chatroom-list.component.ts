import { Component,
         OnInit,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework/rc-cover'
import { ListRooms,
         ChatroomInfo }                           from 'src/shared'
import { RoomService }                            from '../../services/room.service'
import { COMPONENT_TYPE } from 'src/app/cover.component';

@Component({
  selector    : 'cover-chatroom-list',
  templateUrl : './chatroom-list.component.html',
  styleUrls   : ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit {

  header    : string = 'ChatRooms'
  chatrooms : ChatroomInfo[] = []
  chatroomColorMap = {}

  constructor(@Inject('RunContext') public rc : RunContext,
              private roomService             : RoomService) {

  }

  ngOnInit() {

    this.rc.xmn.sendEvent(ListRooms.name)
  }

  listRooms(event: any) {

    console.log(`wasp > listRooms > event: ${JSON.stringify(event.detail)}`)
    const rooms: ChatroomInfo[] = event.detail.rooms
    this.chatrooms.push(...rooms)
  }

  openChatroom() {
    
    this.rc.coRouter.getCover().componentType = COMPONENT_TYPE.CHATROOM
  }


  signOut() {

    this.rc.coRouter.getCover().signOut()
  }


  // to assign a consistent random background color to each chatroom
  getRandomColor(roomName: string) {

    if (!this.chatroomColorMap[roomName]) {
      const min   = 0,
            max   = 255,
            red   = Math.floor(Math.random() * (max - min + 1)) + min,
            green = Math.floor(Math.random() * (max - min + 1)) + min,
            blue  = Math.floor(Math.random() * (max - min + 1)) + min,
            color = `rgb(${red}, ${green}, ${blue})`

      this.chatroomColorMap[roomName] = color
    }

    return this.chatroomColorMap[roomName]
  }





}
