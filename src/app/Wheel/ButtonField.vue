<template>
  <div :class="$style.wrapper">
    <div v-if="winner" :class="$style.winner">
      {{ `Победил вариант ` }}
      <span :class="$style.bold">{{ `"${ winner }"!` }}</span>
    </div>

    <div>
      <Button @click="$emit('activate-wheel')" :disabled="rouletteList.length === 0 || disabled">
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
    props: {
      rouletteList: {
        type: Array,
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      winner: {
        type: String,
      }
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
  }

  .bold {
    font-weight: bold;
  }
</style>
