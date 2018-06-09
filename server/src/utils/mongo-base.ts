/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sat Jun 09 2018
   Author     : Akash Dathan
   
------------------------------------------------------------------------------*/

import * as mongoose                              from 'mongodb'
import * as lo                                    from 'lodash'
import {RunContext}                               from '../framework'

const COUNTER_COLLECTION = 'counter'

export class MongoBase {
  
  protected _id      : any
  protected createTs : number
  protected deleted  : boolean = false
  protected modTs    : number

  protected static _collectionName : string

  static async init(rc : RunContext) {
    try {
      rc.mongo = await mongoose.connect(rc.ENV.MONGO_URL)
      console.log(`Mongo DB Inited : ${rc.ENV.MONGO_URL}`)
    } catch(error) {
      console.log(`Mongo DB Init Error : ${error}`)
    }
  }

  //TODO : columns to be predefined set : check for it
  //TODO : Spectify cloumns (will it make db interaction faster)
  async get(rc : RunContext, id : number) {
    //TODO : handle Object ID
    // id = _._pkObjId && typeof(id) === 'string' ? new ObjectID(id) : id
    
    return await this.findOne(rc, {_id: id})
  }

  async findOne(rc : RunContext, selCrit : {[index : string] : any}) {

    try {
      const collection = this.getCollection(rc),
            record     = await collection.findOne(selCrit)
            
      if(!record) return false

      this.deserialize(record)
      return true
    } catch(error) {
      //TODO : better handling ?
      console.log(`findOne Error : ${error}`)
      throw(error)
    }
  }

  async insert(rc : RunContext, insertTime : number) {
    try {
      const collection = this.getCollection(rc)

      //TODO :
      // if (!_._pkObjId && !_._pkSeq) {
      //   if (mu.assert) mu.assert(_._id)
      // }

      if(!this._id) this._id = await this.getNextSequence(rc)

      const InsertRec = this.getInsertRec(rc, insertTime)

      const resp = await collection.insert(InsertRec)
      if(resp.insertedCount !== 1) {
        console.log(`insert Error : RECORD_ALREADY_EXISTS`)
        return false
      }

      return true

    } catch(error) {
      console.log(`insert Error : ${error}`)
      throw(error)
    }
  }

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Internal functions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */   
  
  getCollection(rc : RunContext) {
    //TODO : Test This
    return rc.mongo.collection((this.constructor as any)._collectionName)
  }

  deserialize(object : {[index : string] : any}) {
    if (!object) return
    
    if(object['_id']) this.setKey(object['_id'])

    //TODO : Need better deserialization (Test this first)
    lo.assign(this, object) 
  }

  setKey(key : any) {
    // this._id = _._pkObjId && typeof(key) === 'string' ? new ObjectID(key) : key
    this._id = key
  }

  async getNextSequence(rc : RunContext, seqCount ?: number) {
    
    const counterCol = rc.mongo.collection(COUNTER_COLLECTION)
        
    if(!seqCount) seqCount = 1
    
    const resp = await counterCol.findOneAndUpdate(
      {_id : (this.constructor as any)._collectionName},
      {$inc : {seq: seqCount}},
      {returnOriginal: false}
    )

    return resp.value.seq
  }

  getInsertRec(rc : RunContext, insertTime : number = Date.now()) { 
    const retVal = {} as any
    
    this.createTs = this.modTs = insertTime
    
    for(let prop in this) { 
      const val = (this as any)[prop]

      if (prop !== '_id' && (prop.substr(0, 1) === '_' || val === undefined || val instanceof Function)) continue
      retVal[prop] = val
    }

    return retVal
  }
}

