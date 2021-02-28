import { readonly, ref, watch } from 'vue';
import seedrandom from 'seedrandom';

import { getStorageItem, setStorageItem, removeStorageItem } from '/@/utils/storage';

const key = 'roulette-seed';

const storageDataString = getStorageItem(key);
const generateSeed = () => Date.now().toString();

const storeTemplate = {
  seed: generateSeed(),
  count: 0,
};

/**
 * @type { { seed: String, count: Number } }
 */
let storageData;

if (storageDataString) {
  try {
    storageData = JSON.parse(storageDataString);
  } catch (e) {
    console.error('Corrupted randomizer storage data, creating new one');
    removeStorageItem(key);
  }
}

if (!storageData) {
  storageData = { ...storeTemplate };
  setStorageItem(key, JSON.stringify(storeTemplate));
}

const seedStore = ref(storageData);

watch([seedStore.value], () => {
  setStorageItem(key, JSON.stringify(seedStore.value));
});

const generateRandom = function* () {
  let generator = seedrandom(seedStore.value.seed);

  while (true) {
    const value = yield generator();

    if (value) {
      generator = seedrandom(value);
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
    seedStore.value.count = 1;
    return generator.next(generateSeed()).value;
  }

  const { value } = generator.next();

  seedStore.value.lastNumber = value;

  return value;
};

export const randomizer = {
  state: readonly(seedStore),
  rng,
};
