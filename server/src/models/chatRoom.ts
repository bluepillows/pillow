/*------------------------------------------------------------------------------
   About      : ChatRoom
   
   Created on : Sat Jun 16 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import { RunContext }                             from '../framework/runcontext'
import { MongoBase }                              from '../utils/mongo-base'

export class ChatRoom extends MongoBase {

  displayName : string
  description : string
  creatorId   : number
  password    : string


  async insertChatRoom(rc : RunContext) {
    await this.insert(rc)
  }

  async getChatRoom(rc : RunContext, userId : number) {
    await this.get(rc, userId)
  }
}