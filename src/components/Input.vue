<template>
  <input v-bind="$attrs" :type="$attrs.type" v-model="value">
</template>

<script>
  export default {
    name: 'Input',
    props: ['modelValue'],
    emits: ['update:modelValue'],
    computed: {
      value: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit('update:modelValue', value);
        }
      }
    }
  };
</script>

<style module lang="scss">

</style>
