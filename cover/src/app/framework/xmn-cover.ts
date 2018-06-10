import { EventSystem }                            from 'src/app/framework/co-event-system'
import { CO_UI_EVENT }                            from './co-event-system'
import * as io                                    from 'socket.io-client'
import { MessageInfo } from 'src/shared/pillow-types';

export enum events {
  pillowMessage = 'pillowMessage'
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

  sendEvent(eventName: string, data: any) {

    this.socket.emit(eventName, data)
  }

  private eventHandler() {

    this.socket.on('pillowMessage', data => {
      
      console.log(`wasp > eventHandler > data: ${JSON.stringify(data)}`)
    
      const message: MessageInfo = data.message

      EventSystem.broadcast(CO_UI_EVENT.NEW_MESSAGE, data)
    })
  }

}