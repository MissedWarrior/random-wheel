<template>
  <div :class="$style.wrapper">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'Point',
  };
</script>

<style module lang="scss">
  .wrapper {
    padding: 0.75em;
    border: 2px solid var(--secondary-text);
    cursor: default;
    display: inline-flex;
    align-items: center;
    width: 100%;
  }
</style>
