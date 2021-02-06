<template>
  <div>
    <Button @click="$emit('activate-wheel')" :disabled="rouletteList.length === 0">
      Запустить рулетку!
    </Button>
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
      }
    },
  };
</script>

<style module lang="scss">

</style>
