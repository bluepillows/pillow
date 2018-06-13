/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sun Jun 10 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import { MessageInfo,
         ChatroomInfo }                           from './pillow-types'

export namespace MessageIO {
  export const name = 'messageIO'

  export type params = {
    message : MessageInfo
  }
  export type retval = {
    name    : string
    message : string
    sentTs  : number
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