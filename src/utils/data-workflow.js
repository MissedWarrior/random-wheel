import { removeStorageItem } from './storage';

/**
 * @param data {Array<Object> | Readonly<Array<Object>>}
 * @return {Object}
 */
export const createConfig = (data) => {
  return {
    version: 'v1',
    saveDate: (new Date()).toUTCString(),
    saveDateTimezone: 'UTC',
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

/**
 * @param config {Object}
 * @return {Object}
 */
export const validateConfig = config => {
  if (!config || typeof config !== 'object') return {
    isValid: false,
    reason: 'Некорректные входные данные',
  };

  if (config.version !== 'v1') return {
    isValid: false,
    reason: 'Версия схемы не поддерживается',
  };

  if (Array.isArray(config.data)) {
    const isDataValid = config.data.every(item => Boolean(item.value));

    return isDataValid ? { isValid: true } : { isValid: false, reason: 'Сохранённый список повреждён' }
  }

  return {
    isValid: false,
    reason: 'Произошла непредвиденная ошибка. Не удалось импортировать схему'
  };
};
