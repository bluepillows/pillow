/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Tue Jun 12 2018
   Author     : Akash Dathan
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/

import { RunContext } from "framework"
const dialogflow = require('dialogflow')

const LANGUAGE_CODE = 'en-US'

export class PillowBot {

  private projectId : string
  private sessionId : string

  constructor(sessionId : string) {
    this.projectId = 'pillow-2220f'
    this.sessionId = sessionId
  }

  async interact(rc : RunContext, message : string) {
    const sessionClient = new dialogflow.SessionsClient(),
          sessionPath   = sessionClient.sessionPath(this.projectId, this.sessionId),
          request       = {
                            session: sessionPath,
                            queryInput: {
                              text: {
                                text: message,
                                languageCode: LANGUAGE_CODE
                              }
                            }
                          }

    return new Promise((resolve, reject) => {
      sessionClient
      .detectIntent(request)
      .then((responses : any) => {
        const result = responses[0].queryResult

        console.log(`Query: ${result.queryText}`)
        console.log(`Response: ${result.fulfillmentText}`)

        if(result.intent) console.log(`Intent: ${result.intent.displayName}`)
        else console.log(`No intent matched.`)

        resolve(result)
      })
      .catch((err : any) => {
        console.error('ERROR:', err)
        reject(err)
      })
    })
  }
}