/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sun Jun 10 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import {
          MessageInfo,
          ChatroomInfo,
          PrivateMessageInfo
       }                                          from './pillow-types'

export namespace MessageIO {
  export const name = 'messageIO'

  export type params = {
    message : MessageInfo
  }

  export type retval = {
    message : MessageInfo
  }
}

export namespace PrivateMessage {
  export const name = 'privateMessage'

  export type params = {
    message : PrivateMessageInfo
  }
  
  export type retval = {
    message : PrivateMessageInfo
  }
}

export namespace JoinRoom {
  export const name = 'joinRoom'

  export type params = {
    room : string
  }

  export type retval = {
  }
}

export namespace ListRooms {
  export const name = 'listRooms'

  export type params = {
  }
  
  export type retval = {
    rooms : ChatroomInfo[]
  }
}