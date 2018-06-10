import { Injectable,
         Inject }                                 from '@angular/core'
import { RunContext }                             from 'src/app/framework/rc-cover'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(@Inject('RunContext') private rc: RunContext) {

  }
}
