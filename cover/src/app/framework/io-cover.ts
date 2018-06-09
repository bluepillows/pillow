
import * as io                                    from 'socket.io-client'

export enum events {
  pillowMessage = 'pillowMessage'
}

export class IOCover {

  private socket : SocketIOClient.Socket
  private url    : string = 'http://localhost:9001'

  constructor() {
    this.socket = io.connect(this.url)
  }

  sendEvent(eventName : events, data : any) {
    this.socket.emit(eventName, data)
  }

}