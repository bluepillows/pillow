/*------------------------------------------------------------------------------
   About      : Communications handles here
   
   Created on : Sun Jun 10 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import { RunContext }                             from './runcontext'
import { RUN_MODE }                               from './server-types'
import * as http                                  from 'http'
import * as https                                 from 'https'
import * as express                               from 'express'
import * as socketio                              from 'socket.io'
import * as fs                                    from 'fs'


export class PillowIo {

  private static rc       : RunContext
  private static io       : socketio.Server
  private static port     : number
  private static server   : http.Server | https.Server
  private static app      : express.Express
  private static eventMap : {[index : string] : InvokeStruct} = {}

  static init(rc : RunContext) {

    this.rc     = rc
    this.app    = express()
    
    if(rc.ENV.RUN_MODE === RUN_MODE.PROD) {

      const key     = fs.readFileSync('./config/pillow-key.pem'),
            cert    = fs.readFileSync('./config/pillow-key.crt'),
            options = {key, cert}

      this.server = https.createServer(options, this.app)
      this.port   = 443

    } else {

      this.server = http.createServer(this.app)
      this.port   = 9001
    }

    
    this.io = socketio(this.server)

    this.io.on('connection', this.handleClient)

    this.server.listen(this.port)

    console.log(`Server running at port ${this.port}`)
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