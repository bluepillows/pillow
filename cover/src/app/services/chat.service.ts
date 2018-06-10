import { Injectable,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework'
import { Observable }                             from 'rxjs'
import * as io                                    from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(@Inject('RunContext') private rc: RunContext) {

  }

  sendMessage(message) {
    
    this.rc.xmn.sendEvent('event-name', {
      msg: message
    })
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
