/*------------------------------------------------------------------------------
   About      : Communications handles here
   
   Created on : Sun Jun 10 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import * as express                               from 'express'
import * as socketio                              from 'socket.io'
import { Server }                                 from 'http'
import { RunContext }                             from './runcontext'
import * as Events                                from '../Events'

export class PillowIo {
  
  static io       : socketio.Server
  static server   : Server
  static eventMap : {[index : string] : InvokeStruct} = {}

  private static rc : RunContext

  static init(rc : RunContext) {
    this.rc = rc
    const port = rc.ENV.SERVER_PORT

    this.server = new Server(express),
    this.io     = socketio(this.server)

    this.io.on('connection', this.handleClient)

    this.server.listen(port)

    console.log(`Server running at port ${port}`)
  }

  static handleClient(socket : socketio.Socket) {
    console.log(`User Conected : ${socket.id}`)

    for(let event in this.eventMap) {
      socket.on(event, async message => {
        console.log(`[${socket.id}] Event : ${event}, Message : ${JSON.stringify(message)}`)
      
        const invStruct = this.eventMap[event],
              retVal    = await invStruct.executeFn(this.rc, message)

        socket.broadcast.emit(event, retVal)
      })
    }

    socket.on('pillowMessage', message => {
      console.log(`Message : ${JSON.stringify(message)}`)

      socket.emit('pillowMessage', message)
    })

    PillowIo.handleDisconnect(socket)
  }

  static handleDisconnect(socket : socketio.Socket) {
    //TODO : handle disconection
    socket.on('disconnect', () => {
      console.log(`User Disconnected : ${socket.id}`)
    })
  }

  // static commitRegister(rc: RunContext, providers: any[]) {

  //   providers.forEach(provider => {

  //     let providerUsed = false
  //      while (provider !== Function && provider !== Object) {
  //       if (this.checkForProvider(rc, provider)) providerUsed = true
  //       provider = provider.constructor
  //     }
  //   })
  // }

  // private static checkForProvider(rc: RunContext, provider: any): boolean {

  //   let providerUsed = false

  //   for (const key in this.eventMap) {

  //     if (!this.eventMap.hasOwnProperty(key)) continue

  //     const eInfo = this.eventMap[key],
  //           fnName = eInfo.name
  //     let match = false

  //     if (eInfo.parent.prototype) { // api is static function of a class
  //       if (provider.hasOwnProperty(fnName) && eInfo.parent === provider) match = true // direct
  //     } else { // api is member function, provider could be a class or instance of class
  //       if (provider.prototype) { // provider is a class
  //         if (provider.prototype.hasOwnProperty(fnName) && eInfo.parent === provider.prototype) match = true // class
  //       } else { // provider is an instance of some class
  //         if (provider[fnName] && eInfo.parent.constructor === provider.constructor) match = true // direct
  //       }
  //     }

  //     if (match) {
  //       this.enrollEvent(fnName)
  //       providerUsed = true
  //     }
  //   }
  //   return providerUsed
    
  // }

  static enrollEvent(eventName : string) {
    if(this.eventMap[eventName]) {
      const msg = `Duplicate definition for event found: ${name}`
      console.error(msg)
      throw(Error(msg))
    }

    this.eventMap[eventName] = new InvokeStruct(name, parent)
    console.log('Enrolled event :', eventName)
  }
}

export function PillowEvent(eventName : string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    PillowIo.enrollEvent(eventName)
  }
}

export class InvokeStruct {

  constructor(public name : string, public parent : any) {}

  async executeFn(...params: any[]) {
    let fn = this.parent[this.name]
    if (fn) return await fn.call(this.parent, ...params)

    const obj = new this.parent()
    return await obj[this.name].call(obj, ...params)
  }
}