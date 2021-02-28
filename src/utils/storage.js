/**
 * @param key {String}
 * @param item {String}
 * @return {void}
 */
export const setStorageItem = (key, item) => localStorage.setItem(key, item);

/**
 * @param key {String}
 * @return {String | null}
 */
export const getStorageItem = key => localStorage.getItem(key);

/**
 * @param key {String}
 * @return {void}
 */
export const removeStorageItem = key => localStorage.removeItem(key);
