<template>
  <label :class="$style.wrapper">
    <div :class="$style.label">Поиск по списку</div>
    <Input v-model="updateQuery"/>
  </label>
</template>

<script>
  import Input from '/@/components/Input.vue';

  export default {
    name: 'SearchPoints',
    components: { Input },
    emits: {
      'update:query': value => typeof value === 'string',
    },
    props: {
      query: {
        type: String,
        default: '',
      }
    },
    computed: {
      updateQuery: {
        get() {
          return this.query;
        },
        set(value) {
          this.$emit('update:query', value);
        }
      }
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
