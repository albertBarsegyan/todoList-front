import { isObject } from 'lodash';

export const getDataFromStorage = (stateName: string, storage: Storage = localStorage) => {
  try {
    return storage.getItem(stateName);
  } catch (err) {
    return null;
  }
};

export const saveDataToStorage = <T>(stateName: string, value: T, storage: Storage = localStorage) => {
  try {
    const serializedState = isObject(value) ? JSON.stringify(value) : String(value);
    storage.setItem(stateName, serializedState);
  } catch (err) {
    return null;
  }
};

export const removeDataFromStorage = (stateName: string, storage: Storage = localStorage) => {
  try {
    storage.removeItem(stateName);
  } catch (err) {
    return null;
  }
};
