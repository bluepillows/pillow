import { enableProdMode }                         from '@angular/core'
import { platformBrowserDynamic }                 from '@angular/platform-browser-dynamic'

import { AppModule }                              from './app/cover.module'
import { environment }                            from './environments/environment'
import { RunContext }                             from './app/framework/rc-cover'


function main() {

  if (environment.production) {
    enableProdMode();
  }

  const rc     = new RunContext()
  window['rc'] = rc
  
  platformBrowserDynamic([{ provide: 'RunContext', useValue: rc }])
  .bootstrapModule(AppModule)
    .catch(err => console.log(err));
}

main()