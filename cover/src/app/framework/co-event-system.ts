
export const CO_UI_EVENT = {
  NEW_MESSAGE : 'new-message'
}

export namespace EventSystem {

  export const EVENT_PREFIX = 'co-event'

  export function broadcast(eventName: string, data ?: object) {

    data = data || {}

    console.log(`wasp > broadcast > data: ${JSON.stringify(data)}`)

    const fullName = eventName.startsWith(EVENT_PREFIX) ? `${eventName}` : `${EVENT_PREFIX}-${eventName}`,
          nodeList = document.querySelectorAll('.' + fullName),
          event    = new CustomEvent(fullName, {detail: data})

    for (let index = 0; index < nodeList.length; index++) {
      const element = nodeList[index]
      element.dispatchEvent(event)
    }
  }
}