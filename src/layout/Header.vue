<template>
  <div :class="$style.header">
    <div :class="$style.inner">
      <Button @click="openSettings">
        Настройки
      </Button>
    </div>
  </div>
</template>

<script>
  import Button from '/@/components/Button.vue';

  export default {
    name: 'Header',
    components: { Button },
    emits: {
      'open-settings': null,
    },
    methods: {
      openSettings() {
        this.$emit('open-settings');
      }
    },
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
