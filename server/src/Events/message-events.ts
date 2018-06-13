/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sun Jun 10 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import { 
          RunContext, 
          PillowEvent
       }                                          from '../framework'
import {
          Server,
          Socket
       }                                          from 'socket.io'
import {
          MessageIO,
          ListRooms,
          JoinRoom
       }                                          from '../shared'
import {PillowBot}                                from '../pillow-bot'

export class MessageEvents {

  @PillowEvent(MessageIO.name)
  async messageIO(rc : RunContext, io : Server, socket : Socket, param : MessageIO.params) {
    const retval = {} as MessageIO.retval,
          room   = param.message.room || 'commom_room'

    
    retval.message = param.message.text
    retval.name    = param.message.senderName
    retval.sentTs  = param.message.sentTs

    if(!socket.rooms[room]) {
      console.log(`Room not yet joined. Joining room : ${room}`)
      socket.join(room)
    }

    io.to(room).emit(MessageIO.name, retval)

    const botResp = await new PillowBot().interact(rc, param.message.text) as any
    const botText = {
      message : botResp.fulfillmentText,
      name    : 'Gideon',
      sentTs  : Date.now()
    }

    io.to(room).emit(MessageIO.name, botText)
  }

  @PillowEvent(ListRooms.name)
  async listRooms(rc : RunContext, io : Server, socket : Socket, param : ListRooms.params) {
    const retval = {} as ListRooms.retval
    
    retval.rooms = []

    for(let roomName in io.sockets.adapter.rooms) {
      retval.rooms.push({roomName})
    }

    socket.emit(ListRooms.name, retval)
  }

  @PillowEvent(JoinRoom.name)
  async joinRoom(rc : RunContext, io : Server, socket : Socket, param : JoinRoom.params) {
    const retval = {} as JoinRoom.retval

    if(param.room) socket.join(param.room)

    socket.emit(JoinRoom.name, retval)

  }
}