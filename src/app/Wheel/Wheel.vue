<template>
  <div :class="$style.wrapper">
    <div :class="$style.wheelWrapper">

      <template v-if="rouletteList.length > 0">
        <div v-for="item in rouletteList" :class="$style.point">
          <div :class="item.class">
            <Point
              overflow-style="hide"
              :title="item.value"
              force-title
              align="center"
            >
              {{ item.value }}
            </Point>
          </div>
        </div>
      </template>

      <div v-else>
        Список пуст
      </div>

    </div>

    <ButtonField
      :disabled="wheelState.isWheelActive"
      @activate-wheel="activateWheel"
      :roulette-list="rouletteList"
      :winner="wheelState.winner"
    />
  </div>
</template>

<script setup name="Wheel">
  import { reactive, computed, inject, useCssModule } from 'vue';

  import Point from '/@/components/Point.vue';
  import audioUrl from '/@/assets/sounds/lalahey.mp3';
  import { useRandom } from '/@/composables/use-random';

  import ButtonField from './ButtonField.vue';

  const visibleVariantsAmount = 5;

  const wheelRunningAudio = new Audio(audioUrl);
  const initialSoundVolume = 0.07;
  const firstCutVolume = 0.06;
  const secondCutVolume = 0.04;

  wheelRunningAudio.volume = 0.07;

  const { rng } = useRandom('roulette-seed');

  const wheelState = reactive({
    isWheelActive: false,
    currentIndex: 0,
    timerId: 0,
    winner: null,
  });

  const wheelStore = inject('wheelStore');
  const style = useCssModule();

  const rouletteList = computed(() => {
    const start = wheelState.currentIndex;
    const list = wheelStore.getActiveList();

    if (list.length > 0) {
      const result = [];
      for (let i = 0; i < visibleVariantsAmount; i++) {
        const item = list[(start + i) % list.length];
        const coloredItem = assignClass(item, i);

        result.push(coloredItem);
      }

      return result;
    }

    return [];
  });

  const randomInteger = (min, max) => {
    const rand = min + rng() * (max + 1 - min);

    return Math.floor(rand);
  };

  const activateWheel = () => {
    const list = wheelStore.getActiveList();
    wheelState.currentIndex = randomInteger(0, list.length - 1);
    wheelState.isWheelActive = true;
    wheelState.winner = null;

    wheelRunningAudio.play();

    const animationDurationsMs = wheelRunningAudio.duration * 1000;

    wheelState.timerId = rotateWheel();

    setTimeout(() => {
      clearInterval(wheelState.timerId);
      wheelState.isWheelActive = false;
      wheelRunningAudio.volume = initialSoundVolume;
      wheelState.winner = rouletteList.value[Math.floor(visibleVariantsAmount / 2)].value;
    }, animationDurationsMs);
  };

  const assignClass = (item, i) => {
    const itemClone = { ...item };

    switch (i) {
      case 0:
      case visibleVariantsAmount - 1: {
        itemClone.class = style.edge;
        break;
      }
      case Math.floor(visibleVariantsAmount / 2): {
        itemClone.class = style.central;
        break;
      }
      default: {
        itemClone.class = style.middle;
        break;
      }
    }

    return itemClone;
  };

  const rotateWheel = () => {
    let ms = 100;
    const { duration } = wheelRunningAudio;
    const list = wheelStore.getActiveList();

    return setTimeout(function tick() {
      wheelState.timerId = setTimeout(tick, ms);

      if (wheelState.currentIndex < list.length - 1) {
        wheelState.currentIndex += 1;
      } else if (wheelState.currentIndex === list.length - 1) {
        wheelState.currentIndex = 0;
      } else {
        throw new Error(`Array is out of bounds, tried to get ${ wheelState.currentIndex } while max index is ${ list.length - 1 }`);
      }

      const { currentTime } = wheelRunningAudio;

      if (currentTime > duration * 0.85) {
        wheelRunningAudio.volume = secondCutVolume;
        ms = 400;
      } else if (currentTime > duration * 0.7) {
        wheelRunningAudio.volume = firstCutVolume;
        ms = 200;
      } else {
        ms = 100;
      }
    }, ms);
  };
</script>

<style module lang="scss">
  .wrapper {
    background: transparent;
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wheel-wrapper {
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .point {
    margin-bottom: 15px;
    width: 100%;
  }

  .central {
    background-color: var(--secondary-text);
    color: var(--primary-text);
  }

  .middle {
    background-color: var(--middle-points);
    color: var(--primary-text);
  }

  .edge {
    background-color: var(--edge-points);
  }
</style>
