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

const setNewVariants = variants => {
  state.value.variants = variants;
};

watch([state.value], () => {
  setStorageItem(key, JSON.stringify(state.value.variants));
});

const addVariant = newVariant => {
  const newItem = {
    id: generateId(),
    value: newVariant,
  };

  state.value.variants.unshift(newItem);
};

const removeVariant = id => {
  const index = state.value.variants.findIndex(item => item.id === id);

  state.value.variants.splice(index, 1);
}

export const wheelStore = {
  state: readonly(state),
  addVariant,
  regenerateStore,
  setNewVariants,
  removeVariant,
};
