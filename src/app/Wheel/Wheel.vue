<template>
  <div :class="$style.wrapper">
    <div :class="$style.wheelWrapper">
      <template v-if="rouletteList.length > 0">
        <div v-for="item in rouletteList" :class="$style.point">
          <Point>{{ item.value }}</Point>
        </div>
      </template>
      <div v-else>
        Список пуст
      </div>
    </div>

    <ButtonField @activate-wheel="activateWheel" :roulette-list="rouletteList"/>
  </div>
</template>

<script>
  import Point from '/@/components/Point.vue';

  import ButtonField from './ButtonField.vue';

  const visibleVariantsAmount = 5;

  export default {
    name: 'Wheel',
    components: { Point, ButtonField },
    inject: ['wheelStore'],
    data() {
      return {
        isWheelActive: false,
        currentIndex: 0,
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
            result.push(item);
          }
          return result;
        }

        return [];
      },
    },
    methods: {
      activateWheel() {
        const list = this.wheelStore.state.value.variants;
        const listLength = list.length;
        this.currentIndex = this.randomInteger(0, list.length - 1);

        const intervalId = setInterval(() => {

          if (this.currentIndex < listLength) {
            this.currentIndex += 1;
          } else if (this.currentIndex === listLength) {
            this.currentIndex = 0;
          } else {
            throw new Error('Array is out of bounds');
          }
        }, 200);

        setTimeout(() => {
          clearInterval(intervalId);
        }, 5000);
      },
      randomInteger(min, max) {
        const rand = min + Math.random() * (max + 1 - min);

        return Math.floor(rand);
      }
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
</style>
