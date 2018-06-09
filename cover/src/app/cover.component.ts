
import { Component, Inject, OnInit }              from '@angular/core'
import { API_STATE }                              from './framework/api-state'
import { RunContext }                             from './framework'
// import { FriendsService }                         from 'src/app/services/friends.service'
import * as io                                    from 'socket.io-client'

enum COMPONENT_TYPE {
  FRIENDS = 'friends',
  CHAT    = 'chat'
}

@Component({
  selector    : 'cover-root',
  templateUrl : './cover.component.html',
  styleUrls   : ['./cover.component.scss']
})

export class CoverComponent implements OnInit {

  socket  : SocketIOClient.Socket

  // API_STATE      : typeof API_STATE      = API_STATE
  // apiState       : API_STATE

  // COMPONENT_TYPE : typeof COMPONENT_TYPE = COMPONENT_TYPE
  // componentType  : COMPONENT_TYPE        = COMPONENT_TYPE.CHAT

  // nightMode      : boolean               = false // WASP : store this in localstorage

  // messages = []


  // constructor(@Inject('RunContext') private rc: RunContext,
  //             private friendsService: FriendsService) {
    
  // }

  // ngOnInit() {
  //   this.friendsService.getFriendsList().subscribe(message => {
  //     console.log(`wasp > cover > ngOnInit > message: ${message}`)
  //   })
  // }

  constructor() {
    this.socket = io.connect('http://localhost:9001')
    console.log('this.socket.connected :', this.socket.connected)
    
  }

  ngOnInit() {
    this.socket.emit('event1', {
      msg: 'Client to server, can you hear me server?'
    })

  }
}
