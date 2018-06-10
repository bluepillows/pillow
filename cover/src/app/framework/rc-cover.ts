import { XmnCover }                               from './xmn-cover'
import { CoRouter }                               from 'src/app/framework/co-router'

export class RunContext {
  
  remoteUrl  : string   = null
  xmn        : XmnCover = null
  senderName : string   = null
  coRouter   : CoRouter = null

  constructor() {

    console.log(`wasp > rc-cover > constructor`)
    
    this.initRouter()
    this.initConnection()
  }
  
  private initRouter() {

    this.coRouter = new CoRouter()
  }

  private initConnection() {

    const loc = window.location

    this.remoteUrl = `${loc.protocol}//${loc.host}`
    this.remoteUrl = `http://localhost:9001`

    if (!this.xmn) {
      this.xmn = new XmnCover(this.remoteUrl)
    }
  }
}