const PREFIX = 'cover-'

export class StorageProvider {
  
  setValue(key: string, value: string) {

    const storageKey = PREFIX + key
    localStorage.setItem(storageKey, value)
  }

  getValue(key: string) {
    
    const storageKey = PREFIX + key
    return localStorage.getItem(storageKey)
  }
}