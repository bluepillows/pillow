/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Fri Jun 08 2018
   Author     : Akash Dathan

------------------------------------------------------------------------------*/

import { 
         RunContext,
         PillowIo
       }                                          from './framework'

export class PillowServer {

  rc : RunContext

  main() {
    this.rc = new RunContext()

    PillowIo.init(this.rc)
  }

}


// process.on('unhandledRejection', errorhandler('unhandledRejection'))
// process.on('uncaughtException', errorhandler('uncaughtException'))

function errorhandler(type : string) {
  return function (reason : any) {
    console.log(`[PROCESS] ${type}`)
    console.log('* * * * * * * * * * * * * * * * * * * *')
    console.log(JSON.stringify(reason))
    console.log('* * * * * * * * * * * * * * * * * * * *')
  }
}

new PillowServer().main()
