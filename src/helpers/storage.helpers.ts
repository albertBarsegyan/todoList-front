export const getDataFromStorage = (
  stateName: string,
  storage: Storage = localStorage
) => {
  try {
    const serializedState = storage.getItem(stateName)

    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveDataToStorage = <T>(
  stateName: string,
  value: T,
  storage: Storage = localStorage
) => {
  try {
    const serializedState = JSON.stringify(value)
    storage.setItem(stateName, serializedState)
  } catch (err) {
    throw new Error("Can't save changes in local storage")
  }
}

export const removeDataFromStorage = (
  stateName: string,
  storage: Storage = localStorage
) => {
  try {
    storage.removeItem(stateName)
  } catch (err) {
    throw new Error("Can't save changes in local storage")
  }
}
