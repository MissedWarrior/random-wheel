import { ref, readonly, watch } from 'vue';

import { getStorageItem, setStorageItem } from '/@/utils/storage';
import { parseSavedData } from '/@/utils/data-workflow';

const key = 'roulette-data';

const getSavedData = () => parseSavedData(getStorageItem(key), key);

const generateId = function () {
  return '_' + Date.now().toString(36).substr(2, 9);
};

const state = ref({
  variants: getSavedData(),
});

const regenerateStore = () => {
  state.value = {
    variants: getSavedData(),
  };
};

/**
 * @param variants {Array<{id: String, value: String}>}
 */
const setNewVariants = variants => {
  state.value.variants = variants;
};

watch([state.value], () => {
  setStorageItem(key, JSON.stringify(state.value.variants));
});

/**
 * @param newVariant {String}
 */
const addVariant = newVariant => {
  const newItem = {
    id: generateId(),
    value: newVariant,
  };

  state.value.variants.unshift(newItem);
};

/**
 * @param id {String}
 */
const removeVariant = id => {
  const index = state.value.variants.findIndex(item => item.id === id);

  state.value.variants.splice(index, 1);
};

/**
 * @return {ReadonlyArray<{id: String, value: String}>}
 */
const getActiveList = () => {
  return readonly(state.value.variants);
};

export const wheelStore = {
  state: readonly(state),
  addVariant,
  regenerateStore,
  setNewVariants,
  removeVariant,
  getActiveList,
};
