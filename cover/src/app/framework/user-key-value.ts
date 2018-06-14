import { StorageProvider }                        from "./storage"

export const USER_KEYS = {
  NAME : 'name'
}

export class UserKeyValue {

  constructor(private storage: StorageProvider) { }

  set name(value: string) {
    this.storage.setValue(USER_KEYS.NAME, value)
  }

  get name() {
    return this.storage.getValue(USER_KEYS.NAME)
  }
}