<template>
  <div :class="$style.wrapper">
    <div :class="$style.wheelWrapper">

      <template v-if="rouletteList.length > 0">
        <div v-for="item in rouletteList" :class="$style.point">
          <div :class="item.class">
            <Point overflow-style="hide" :title="item.value" force-title>{{ item.value }}</Point>
          </div>
        </div>
      </template>

      <div v-else>
        Список пуст
      </div>

    </div>

    <ButtonField
      :disabled="isWheelActive"
      @activate-wheel="activateWheel"
      :roulette-list="rouletteList"
      :winner="winner"
    />
  </div>
</template>

<script>
  import Point from '/@/components/Point.vue';

  import ButtonField from './ButtonField.vue';

  import audioUrl from '/@/assets/sounds/volchok.mp3';

  const visibleVariantsAmount = 5;

  const wheelRunningAudio = new Audio(audioUrl);
  wheelRunningAudio.volume = 0.3;

  export default {
    name: 'Wheel',
    components: { Point, ButtonField },
    inject: ['wheelStore'],
    data() {
      return {
        isWheelActive: false,
        currentIndex: 0,
        timerId: 0,
        winner: null,
      };
    },
    computed: {
      rouletteList() {
        const start = this.currentIndex;
        const list = this.wheelStore.state.value.variants;

        if (list.length > 0) {
          const result = [];
          for (let i = 0; i < visibleVariantsAmount; i++) {
            const item = list[(start + i) % list.length];
            const coloredItem = this.assignClass(item, i);

            result.push(coloredItem);
          }

          return result;
        }

        return [];
      },
    },
    methods: {
      activateWheel() {
        const list = this.wheelStore.state.value.variants;
        this.currentIndex = this.randomInteger(0, list.length - 1);
        this.isWheelActive = true;
        this.winner = null;

        wheelRunningAudio.play();

        const animationDurationsMs = wheelRunningAudio.duration * 1000;

        this.timerId = this.rotateWheel();

        setTimeout(() => {
          clearInterval(this.timerId);
          this.isWheelActive = false;
          this.winner = this.rouletteList[Math.floor(visibleVariantsAmount / 2)].value;
        }, animationDurationsMs);
      },
      rotateWheel() {
        const self = this;
        let ms = 100;
        const { duration } = wheelRunningAudio;

        return setTimeout(function tick() {
          const list = self.wheelStore.state.value.variants;

          if (self.currentIndex < list.length - 1) {
            self.currentIndex += 1;
          } else if (self.currentIndex === list.length - 1) {
            self.currentIndex = 0;
          } else {
            throw new Error('Array is out of bounds');
          }

          const { currentTime } = wheelRunningAudio;

          if (currentTime > duration * 0.85) {
            ms = 400;
          } else if (currentTime > duration * 0.7) {
            ms = 200;
          } else {
            ms = self.randomInteger(80, 120);
          }

          self.timerId = setTimeout(tick, ms);
        }, ms);
      },
      assignClass(item, i) {
        const itemClone = { ...item };

        switch (i) {
          case 0:
          case visibleVariantsAmount - 1: {
            itemClone.class = this.$style.edge;
            break;
          }
          case Math.floor(visibleVariantsAmount / 2): {
            itemClone.class = this.$style.central;
            break;
          }
          default: {
            itemClone.class = this.$style.middle;
            break;
          }
        }

        return itemClone;
      },
      randomInteger(min, max) {
        const rand = min + Math.random() * (max + 1 - min);

        return Math.floor(rand);
      },
    },
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
