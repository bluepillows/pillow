/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Fri Jun 08 2018
   Author     : Akash Dathan

------------------------------------------------------------------------------*/

import * as express                              from 'express'
import * as socketio                             from 'socket.io'
import {Server}                                  from 'http'

const PORT = 9001

const server = new Server(express),
      io     = socketio(server),
      app    = express()

export class PillowServer {
  
  main() {
    io.on('connection', this.handleClient)

    console.log(`Listening to port : ${PORT}`)
    app.listen(PORT)
  }

  handleClient(socket : socketio.Socket) {
    console.log('User Connected')

    socket.on('message', (message) => {
      io.emit('message', message)
    })

    socket.on('disconnect', () => {
      console.log('User Disconnected')
    })
  }
}

new PillowServer().main()
