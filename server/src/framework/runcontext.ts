/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sat Jun 09 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import {Db}                                       from 'mongodb'
import {ENV}                                      from './env'

export class RunContext {

  mongo : Db
  ENV   : ENV

  constructor() {

  }
  
}