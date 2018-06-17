/*------------------------------------------------------------------------------
   About      : Communications handles here
   
   Created on : Sun Jun 10 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import * as express                               from 'express'
import * as socketio                              from 'socket.io'
import { RunContext }                             from './runcontext'
import { 
         createServer,
         Server
       }                                          from 'http'

export class PillowIo {

  private static rc       : RunContext
  private static eventMap : {[index : string] : InvokeStruct} = {}
  
  static io       : socketio.Server
  static server   : Server
  static app      : express.Express

  static init(rc : RunContext) {
    const port = rc.ENV.SERVER_PORT

    this.app    = express()
    this.rc     = rc
    this.server = createServer(this.app)
    this.io     = socketio(this.server)

    this.io.on('connection', this.handleClient)

    this.server.listen(port)

    console.log(`Server running at port ${port}`)
  }

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                              INTERNAL FUNCTONS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */  

  private static handleClient(socket : socketio.Socket) {
    console.log(`User Conected : ${socket.id}`)

    for(let event in PillowIo.eventMap) {
      socket.on(event, async message => {
        console.log(`[${socket.id}] Event : ${event}, Message : ${JSON.stringify(message)}`)
      
        const invStruct = PillowIo.eventMap[event]
        await invStruct.executeFn(this.rc, PillowIo.io, socket, message)
      })
    }

    PillowIo.handleDisconnect(socket)
  }

  static handleDisconnect(socket : socketio.Socket) {
    socket.on('disconnect', () => {
      console.log(`User Disconnected : ${socket.id}`)
    })
  }

  static commitRegister(rc: RunContext, providers: any[]) {
    
  }


  static enrollEvent(eventName : string, parent : any) {
    if(this.eventMap[eventName]) {
      const msg = `Duplicate definition for event found: ${eventName}`
      console.error(msg)
      throw(Error(msg))
    }

    this.eventMap[eventName] = new InvokeStruct(eventName, parent)
    console.log('Enrolled event :', eventName)
  }
}

export function PillowEvent(eventName : string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    PillowIo.enrollEvent(eventName, target)
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