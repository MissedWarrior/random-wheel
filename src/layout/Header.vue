<template>
  <div :class="$style.header">
    <div :class="$style.inner">
      <Button @click="openModal">Настройки</Button>
    </div>
  </div>
</template>

<script>
  import Button from '/@/components/Button.vue';

  export default {
    name: 'Header',
    components: { Button },
    methods: {
      openModal() {
        console.log('modal opened');
      }
    }
  };
</script>

<style module lang="scss">
  .header {
    border-bottom: 1px solid var(--border);
    width: 100%;
    padding: 12px 24px;
  }

  .inner {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
