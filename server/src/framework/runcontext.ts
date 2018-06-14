/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sat Jun 09 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import {Db}                                       from 'mongodb'
import {ENV}                                      from './env'
import * as path from 'path'

export class RunContext {

  mongo : Db
  ENV   : ENV

  constructor() {
    this.ENV = require(path.resolve('./config/env.json'))
  }
  
}