export class RunContext {
  
  remoteUrl: string = null

  constructor() {
    
    const loc = window.location

    this.remoteUrl = `${loc.protocol}//${loc.host}`

  }


}