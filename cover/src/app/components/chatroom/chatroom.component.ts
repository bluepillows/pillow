import { Component,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework/rc-cover'
import { RoomService }                            from 'src/app/services/room.service'
import { API_STATE }                              from 'src/app/framework/api-state'
import { ChatroomInfo } from '../../../shared';
import { COMPONENT_TYPE } from 'src/app/cover.component';

@Component({
  selector    : 'cover-chatroom',
  templateUrl : './chatroom.component.html',
  styleUrls   : ['./chatroom.component.scss']
})
export class ChatroomComponent {


  API_STATE      : typeof API_STATE = API_STATE
  apiState       : API_STATE

  header : string = 'Create ChatRoom'
  name   : string = null
  desc   : string = null
  
  constructor(@Inject('RunContext') public rc : RunContext,
              private roomService             : RoomService) { }

  
   createRoom() {
     
     const roomInfo: ChatroomInfo = {
      roomName         : this.name,
      desc             : this.desc,
      activeUsersCount : null
     }

    this.roomService.createRoom(roomInfo)

    this.rc.coRouter.getCover().setCurrentChatRoom(roomInfo)
    this.rc.coRouter.getCover().componentType = COMPONENT_TYPE.CHAT
   }
  

}
