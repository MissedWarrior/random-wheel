<template>
  <div :class="$style.wrapper">
    <div v-if="winner" :class="$style.winner">
      <div>
        {{ 'Победил вариант ' }}
      </div>
      <div :class="$style.winnerText">{{ `"${ winner }"!` }}</div>
    </div>

    <div>
      <Button
        @click="activateWheel"
        :disabled="disabled"
        data-test-id="activate-wheel"
      >
        Запустить рулетку!
      </Button>
    </div>
  </div>
</template>

<script>
  import Button from '/@/components/Button.vue';

  export default {
    name: 'ButtonField',
    components: { Button },
    emits: {
      'activate-wheel': null,
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      winner: {
        type: String,
      }
    },
    methods: {
      activateWheel() {
        this.$emit('activate-wheel');
      },
    },
  };
</script>

<style module lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .winner {
    font-size: 2rem;
    margin-bottom: 20px;
    hyphens: auto;
    word-break: break-word;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .winner-text {
    font-weight: bold;
    text-align: center;
  }
</style>
