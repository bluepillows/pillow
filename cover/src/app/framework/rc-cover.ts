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

    this.remoteUrl = `http://35.229.109.108:9001`
    // this.remoteUrl = `http://localhost:9001`

    if (!this.xmn) {
      this.xmn = new XmnCover(this.remoteUrl)
    }
  }

  private initStorage() {

    const storage     = new StorageProvider()

    this.userKeyValue = new UserKeyValue(storage)
  }
}