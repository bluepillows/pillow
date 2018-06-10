import * as io                                    from 'socket.io-client'
import { XmnCover } from './xmn-cover';

export class RunContext {
  
  remoteUrl : string   = null
  xmn       : XmnCover = null

  constructor() {

    console.log(`wasp > rc-cover > constructor`)
    
    const loc = window.location

    this.remoteUrl = `${loc.protocol}//${loc.host}`
    this.remoteUrl = `http://localhost:9001`

    this.prepareConnection()
  }

  private prepareConnection() {

    if (!this.xmn) {
      this.xmn = new XmnCover(this.remoteUrl)
    }
  }


}