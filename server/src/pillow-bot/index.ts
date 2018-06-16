/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Tue Jun 12 2018
   Author     : Akash Dathan
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/

const dialogflow = require('dialogflow')

export class PillowBot {

  static BotName : string = 'PillowBot'

  constructor(private sessionId : string, private projectId : string = 'pillow-2220f') {}

  async interact(message : string) {
    const sessionClient = new dialogflow.SessionsClient(),
          sessionPath   = sessionClient.sessionPath(this.projectId, this.sessionId),
          request       = {
                            session    : sessionPath,
                            queryInput : {text : {text : message, languageCode: 'en-US'}}
                          }

    return new Promise((resolve, reject) => {
      sessionClient
      .detectIntent(request)
      .then((responses : any) => {resolve(responses[0].queryResult)})
      .catch((err : any) => {reject(err)})
    })
  }
}