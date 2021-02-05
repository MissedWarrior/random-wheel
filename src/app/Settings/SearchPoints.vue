<template>
  <label :class="$style.wrapper">
    <div :class="$style.label">Поиск по списку</div>
    <Input @input="handleInput"/>
  </label>
</template>

<script>
  import Input from '/@/components/Input.vue';

  export default {
    name: 'SearchPoints',
    components: { Input },
    methods: {
      handleInput(e) {
        const { value } = e.target;

        this.$emit('search', value);
      },
    },
  };
</script>

<style module lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
  }

  .label {
    padding-bottom: 8px;
  }
</style>
