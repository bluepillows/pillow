/*------------------------------------------------------------------------------
   About      : User Table
   
   Created on : Sat Jun 16 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import { RunContext }                             from '../framework/runcontext'
import { MongoBase }                              from '../utils/mongo-base'
import { 
         UserRoles,
         Gender 
       }                                          from '../shared'

export class User extends MongoBase {
  name         : string
  alias        : string
  email        : string
  thumbnailUrl : string
  phoneNo      : string
  userRole     : UserRoles
  gender       : Gender
  bio          : string
  livesIn      : string


  async insertUser(rc : RunContext) {
    await this.insert(rc)
  }

  async getUser(rc : RunContext, userId : number) {
    await this.get(rc, userId)
  }
 
}