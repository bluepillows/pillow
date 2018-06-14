import { Injectable,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework/rc-cover'

@Injectable({
  providedIn: 'root'
})
export class GenericStateService {

  constructor(@Inject('RunContext') public rc : RunContext) { }


}
