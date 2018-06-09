import { Injectable,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework'
import { Observable }                             from 'rxjs'
import * as io                                    from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private url = 'http://192.168.0.105:9001'
  private socket

  friendsList: any[]

  constructor(@Inject('RunContext') private rc: RunContext) {

  }

  getFriendsList() {

    console.log(`wasp > getFriendsList`)

    let observable = new Observable(observer => {
      
      this.socket = io(this.url);

      this.socket.on('message', (data) => {

        console.log(`wasp > getFriendsList > data: ${JSON.stringify(data)}`)

        observer.next(data)
      })
      return () => {
        this.socket.disconnect()
      }
    })
    return observable
  }
  
}
