/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sun Jun 10 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import { 
          RunContext, 
          PillowEvent
       }                                          from '../framework'
import {PillowMessage}                            from '../shared'

export class MessageEvents {

  @PillowEvent(PillowMessage.name)
  async pillowMessage(rc : RunContext, message : PillowMessage.params) {
    return message
  }

}