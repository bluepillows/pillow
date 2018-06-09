/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Fri Jun 08 2018
   Author     : Akash Dathan

------------------------------------------------------------------------------*/

import * as express                               from 'express'
import * as socketio                              from 'socket.io'
import * as path                                  from 'path'
import {Server}                                   from 'http'


/*
RESERVED EVENTS
- Connect
- Message
- Disconnect
- Reconnect
- Ping
- Join 
- Leave
*/

//EVENT_DATA Can Be Anything That Is To Be Sent To The Server

const PORT = 9001

const server = new Server(express),
      io     = socketio(server),
      app    = express()

export class PillowServer {

  main() {

    // app.get('/', (req, res) => {
    //   res.sendFile(path.resolve('index.html'))
    // })

    io.on('connection', this.handleClient)

    console.log(`Listening to port : ${PORT}`)
    app.listen(PORT)
  }

  handleClient(socket : socketio.Socket) {
    console.log('A User Conected')
    
    //sent on `message` event (Built In)
    // socket.send('Sent a message')

    // socket.emit for sending custom event
    // socket.emit('testerEvent', { description: 'A custom event named testerEvent!'})

    // Receive custom event
    // socket.on('clientEvent', (data) => {
    //   console.log(data)
    // })

    // socket.on('pillowMessage', (data) => {
    //   //Send message to everyone
    //   io.sockets.emit('newMessage', data)
    // })

    socket.on('message', (message) => {
      io.emit('message', message)
    })

    socket.on('disconnect', () => {
      console.log('User Disconnected')
    })
  }
}

new PillowServer().main()
