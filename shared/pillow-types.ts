export class UserInfo {
  uid  : number
  name : string
}

export class MessageInfo {
  text         : string
  senderName   : string
  sentTs       : number
  room        ?: string
}

export class PrivateMessageInfo {
  text         : string
  senderName   : string
  senderId     : string
  targetUserId : string
  sentTs       : number
}

export class ChatroomInfo {
  roomName         : string
  desc             : string
  activeUsersCount : number
}

export const PillowConstants = {
  DefaultChatroom : 'commom_room'
}

export enum UserRoles {
  USER  = 'USER',
  ADMIN = 'ADMIN'
}

export enum Gender {
  MALE   = 'MALE',
  FEMALE = 'FEMALE'
}