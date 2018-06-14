import { Injectable,
         Inject }                             from '@angular/core'
import { RunContext }                         from 'src/app/framework/rc-cover'
import { JoinRoom }                           from 'src/shared/pillow-interfaces'
import { ChatroomInfo } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(@Inject('RunContext') private rc: RunContext) { }

  createRoom(room: ChatroomInfo) {

    this.rc.xmn.sendEvent(JoinRoom.name, {
      room
    })
  }
}
