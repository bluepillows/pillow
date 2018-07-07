/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sat Jun 09 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import { RUN_MODE }                               from './server-types'

export type ENV = {

  MONGO_URL   : string

  SERVER_NAME : string

  RUN_MODE    : RUN_MODE
  
}