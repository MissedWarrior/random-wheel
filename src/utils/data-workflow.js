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
 * @return {Array<Object>}
 */
export const parseSavedData = (data) => {
  try {
    return data ? JSON.parse(data) : [];
  } catch (e) {
    alert('Не удалось распознать сохранённые данные. Хранилище было очищено');
    return [];
  }
};
