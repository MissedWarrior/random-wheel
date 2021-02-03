import { removeStorageItem } from './storage';

/**
 * @param data {Array<Object>}
 * @return {Object}
 */
export const createConfig = (data) => {
  return {
    version: 'v1',
    saveDate: (new Date()).toUTCString(),
    data,
  };
};

/**
 * @param data {String}
 * @param key {String}
 * @return {Array<Object>}
 */
export const parseSavedData = (data, key) => {
  try {
    return data ? JSON.parse(data) : [];
  } catch (e) {
    removeStorageItem(key);
    alert('Не удалось распознать сохранённые данные. Хранилище было очищено');
    return [];
  }
};
