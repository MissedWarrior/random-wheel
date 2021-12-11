<template>
  <div :class="$style.wrapper">
    <div :class="$style.importWrapper">
      <div>
        <span>Импортировать список</span>
      </div>
      <div>
        <InputFile accept="application/json" @upload="importData">Импорт...</InputFile>
      </div>
    </div>
    <div :class="$style.exportWrapper">
      <div>
        <span>Экспортировать список</span>
      </div>
      <div>
        <Button appearance="secondary" @click="exportData">Экспорт</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import InputFile from '/@/components/InputFile.vue';
  import Button from '/@/components/Button.vue';

  export default {
    name: 'DataTransfer',
    components: { Button, InputFile },
    emits: {
      'import-data': event => event instanceof Event,
      'export-data': null,
    },
    methods: {
      importData(e) {
        this.$emit('import-data', e)
      },
      exportData() {
        this.$emit('export-data');
      }
    }
  };
</script>

<style module lang="scss">
  .wrapper {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 20px 0;
  }

  .import-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .export-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
