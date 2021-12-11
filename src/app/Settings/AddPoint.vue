<template>
  <form :class="$style.wrapper" @submit.prevent="handleSubmit">
    <div :class="$style.labelWrapper">
      <label :class="$style.label" for="addPoint">
        <span>Добавить новый пункт колеса:</span>
      </label>
      <div :class="$style.inputWrapper">
        <Input
          id="addPoint"
          name="addPoint"
          v-model.trim="newPoint"
          autocomplete="off"
          ref="input"
        />
      </div>
    </div>
    <div :class="$style.button">
      <Button>Добавить</Button>
    </div>
  </form>
</template>

<script>
  import Input from '/@/components/Input.vue';
  import Button from '/@/components/Button.vue';

  export default {
    name: 'AddPoint',
    components: { Button, Input },
    emits: {
      'add-point': point => point.length > 0,
    },
    data() {
      return {
        newPoint: '',
      };
    },
    methods: {
      handleSubmit() {
        if (this.newPoint?.length > 0) {
          this.$emit('add-point', this.newPoint);
          this.newPoint = '';
          this.$refs.input.$el.focus();
        }
      },
    },
  };
</script>

<style module lang="scss">
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .label {
    display: inline-flex;
    flex-direction: column;
    padding-bottom: 8px;
  }

  .label-wrapper {
    width: 100%;
  }

  .button {
    margin-left: 20px;
    display: inline-flex;
  }

  .input-wrapper {
    width: 100%;
  }
</style>
