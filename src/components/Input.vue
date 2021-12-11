<template>
  <input v-bind="$attrs" :type="$attrs.type" v-model="value" :class="$style.input">
</template>

<script>
  export default {
    name: 'Input',
    emits: {
      'update:modelValue': payload => typeof payload === 'string',
    },
    props: {
      modelValue: {
        type: String,
        default: '',
      },
    },
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
  .input {
    width: 100%;
  }
</style>
