<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: 'DataTransfer',
    methods: {
      importData() {
        this.$emit('import-data', '')
      },
      exportData() {
        this.$emit('export-data');
      }
    }
  };
</script>

<style module lang="scss">

</style>
