
import * as io                                    from 'socket.io-client'

export enum events {
  pillowMessage = 'pillowMessage'
}

export class XmnCover {

  private socket : any

  constructor(url: string) {

    this.setupConnection(url)
  }

  setupConnection(url) {

    if (!this.socket) {
      this.socket = io.connect(url)
    }
  }

  sendEvent(eventName: events, data: any) {
    
    this.socket.emit(eventName, data)
  }

}