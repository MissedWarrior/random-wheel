import { ref, readonly, watch } from 'vue';

import { getStorageItem, setStorageItem } from '/@/utils/storage';
import { parseSavedData } from '/@/utils/data-workflow';

const key = 'roulette-data';

const getSavedData = () => parseSavedData(getStorageItem(key), key);

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
    value: newVariant,
  };

  state.value.variants.unshift(newItem);
};

export const wheelStore = {
  state: readonly(state),
  addVariant,
  regenerateStore,
  setNewVariants,
};
