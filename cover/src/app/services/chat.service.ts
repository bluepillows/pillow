import { Injectable,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework'
import { Observable }                             from 'rxjs'
import * as io                                    from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://192.168.0.105:9001'
  private socket

  constructor(@Inject('RunContext') private rc: RunContext) {

  }

  sendMessage(message){
    console.log(`wasp > chat.service > sendMessage: ${message}`)
    this.socket.emit('message', message)
  }
  
  getMessages() {

    console.log(`wasp > getMessages`)

    let observable = new Observable(observer => {
      
      this.socket = io(this.url);

      this.socket.on('message', (data) => {

        console.log(`wasp > getMessages > data: ${JSON.stringify(data)}`)

        observer.next(data)
      })
      return () => {
        this.socket.disconnect()
      }
    })
    return observable
  }
  

}
