import { EventSystem }                            from 'src/app/framework/co-event-system'
import { CO_UI_EVENT }                            from './co-event-system'
import { ListRooms,
         MessageIO }                              from 'src/shared'
import * as io                                    from 'socket.io-client'

export enum events {
  messageIO = 'messageIO'
}

export class XmnCover {

  private socket : any

  constructor(url: string) {

    this.setupConnection(url)

    this.eventHandler()
  }

  setupConnection(url) {

    if (!this.socket) {
      this.socket = io.connect(url)
    }
  }

  sendEvent(eventName: string, data ?: any) {

    data = data || {}

    this.socket.emit(eventName, data)
  }

  private eventHandler() {

    // event handler for sendMessage
    this.socket.on(MessageIO.name, data => {

      EventSystem.broadcast(CO_UI_EVENT.MESSAGE_IO, data)
    })

    // event handler for listRooms
    this.socket.on(ListRooms.name, data => {

      EventSystem.broadcast(CO_UI_EVENT.LIST_ROOMS, data)
    })
  }

}