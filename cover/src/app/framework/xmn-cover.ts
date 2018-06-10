
import * as io                                    from 'socket.io-client'

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

    console.log(`wasp > sendEvent > eventname: ${eventName}, data: ${JSON.stringify(data)}`)

    this.socket.emit(eventName, data)
  }

  private eventHandler() {
    console.log(`wasp > eventHandler`)

    this.socket.on('pillowMessage', data => {
      console.log(`wasp > eventHandler > data: ${data}`)
    })
  }

}