import { readonly, ref, watch } from 'vue';
import seedrandom from 'seedrandom';

import { getStorageItem, setStorageItem, removeStorageItem } from '/@/utils/storage';

const generateSeed = () => Date.now().toString();

/**
 * @return { { seed: String, count: Number, lastNumber?: Number } }
 */
const getStoreTemplate = () => ({
  seed: generateSeed(),
  count: 0,
});

export const useRandom = key => {
  /**
   * @type { { seed: String, count: Number, lastNumber?: Number } }
   */
  let storageData;

  if (key) {
    const storageDataString = getStorageItem(key);

    if (storageDataString) {
      try {
        storageData = JSON.parse(storageDataString);
      } catch (e) {
        console.error('Corrupted randomizer storage data, creating new one');
        removeStorageItem(key);
      }
    }
  }

  const seedStore = ref(storageData ? storageData : { ...getStoreTemplate() });

  if (key) {
    watch(seedStore.value, () => {
      setStorageItem(key, JSON.stringify(seedStore.value));
    });
  }

  const generateRandom = function* () {
    let generator = seedrandom(seedStore.value.seed);

    while (true) {
      const value = yield generator();

      if (value) {
        generator = seedrandom(value);
        seedStore.value.seed = value;
      }
    }
  };

  const generator = generateRandom();

  for (let i = 0; i < seedStore.value.count; i++) {
    generator.next();
  }

  const rng = () => {
    seedStore.value.count += 1;

    if (seedStore.value.count >= 200) {
      seedStore.value.count = 0;
      return generator.next(generateSeed()).value;
    }

    const { value } = generator.next();

    seedStore.value.lastNumber = value;

    return value;
  };

  return {
    state: readonly(seedStore),
    rng,
  };
};
