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

export class ChatroomInfo {
  roomName         : string
  desc             : string
  activeUsersCount : number

}