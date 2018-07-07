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
        CheckName,
        ListRooms,
        JoinRoom,
        PrivateMessage,
        PillowConstants
       }                                          from '../shared'
import {PillowBot}                                from '../pillow-bot'
import * as lo                                    from 'lodash'

export class MessageEvents {

  private static chatRooms : string[] = [PillowBot.BotName]

  private static users : {id : string, name : string}[] = []

  @PillowEvent(MessageIO.name)
  async messageIO(rc : RunContext, io : Server, socket : Socket, param : MessageIO.params) {
    const room = param.message.room || PillowConstants.DefaultChatroom

    if(!socket.rooms[room]) socket.join(room)
    io.to(room).emit(MessageIO.name, param)

    if(room === PillowBot.BotName) {
      const botResp = await new PillowBot('random-Id').interact(param.message.text) as any,
            botText = {} as MessageIO.retval

      botText.message = {
        text       : botResp.fulfillmentText,
        senderName : PillowBot.BotName,
        sentTs     : Date.now(),
        room       : room
      }

      io.to(room).emit(MessageIO.name, botText)
    }
  }

  @PillowEvent(CheckName.name)
  async checkName(rc : RunContext, io : Server, socket : Socket, param : CheckName.params) {
    const retVal = {} as CheckName.retval

    retVal.inUse = lo.some(MessageEvents.users, obj => obj.name === param.name)

    io.to(socket.id).emit(CheckName.name, retVal)
  }

  @PillowEvent(PrivateMessage.name)
  async privateMessage(rc : RunContext, io : Server, socket : Socket, param : PrivateMessage.params) {
    io.to(param.message.targetUserId).emit(PrivateMessage.name, param)
  }

  @PillowEvent(ListRooms.name)
  async listRooms(rc : RunContext, io : Server, socket : Socket, param : ListRooms.params) {
    const retval = {} as ListRooms.retval
    
    retval.rooms = []
    
    for(const chatRoom of MessageEvents.chatRooms) {
      const roomInfo = {
        roomName         : chatRoom,
        desc             : '',
        activeUsersCount : io.sockets.adapter.rooms[chatRoom] ? io.sockets.adapter.rooms[chatRoom].length : 0
      }

      retval.rooms.push(roomInfo)
    }

    socket.emit(ListRooms.name, retval)
  }

  @PillowEvent(JoinRoom.name)
  async joinRoom(rc : RunContext, io : Server, socket : Socket, param : JoinRoom.params) {
    const retval = {} as JoinRoom.retval

    MessageEvents.chatRooms.push(param.room.roomName)
    if(param.room) socket.join(param.room.roomName)

    socket.emit(JoinRoom.name, retval)

  }
}