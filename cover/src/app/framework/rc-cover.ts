import { XmnCover }                               from 'src/app/framework/xmn-cover'
import { CoRouter }                               from 'src/app/framework/co-router'
import { StorageProvider }                        from 'src/app/framework/storage'
import { UserKeyValue }                           from './user-key-value'

export class RunContext {
  
  remoteUrl    : string       = null
  xmn          : XmnCover     = null
  coRouter     : CoRouter     = null
  userKeyValue : UserKeyValue = null

  constructor() {
    
    this.initRouter()
    this.initConnection()
    this.initStorage()
  }
  
  private initRouter() {

    this.coRouter = new CoRouter()
  }

  private initConnection() {

    const loc = window.location

    this.remoteUrl = `${loc.protocol}//${loc.host}`
    this.remoteUrl = `http://192.168.10.151:9001`

    if (!this.xmn) {
      this.xmn = new XmnCover(this.remoteUrl)
    }
  }

  private initStorage() {

    const storage     = new StorageProvider()

    this.userKeyValue = new UserKeyValue(storage)
  }
}