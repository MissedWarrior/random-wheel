<template>
  <label :class="$style.label">
    <input v-bind="$attrs" :class="$style.input" type="file" @change="uploadFile">
    <div :class="[$style.button, $style[$props.appearance]]">
      <slot/>
    </div>
  </label>
</template>

<script>
  export default {
    name: 'InputFile',
    props: {
      appearance: {
        type: String,
        default: 'primary',
        validator(val) {
          return ['primary', 'secondary'].indexOf(val) !== -1;
        },
      },
    },
    methods: {
      uploadFile(e) {
        this.$emit('upload', e)
      }
    }
  };
</script>

<style module lang="scss">
  .label {
    display: inline-block;
  }

  .input {
    display: none;
  }

  .primary {
    border: 1px solid var(--primary);
    background-color: var(--primary);
    color: var(--primary-text);

    &:hover {
      background-color: var(--secondary);
      border-color: var(--secondary);
    }
  }

  .secondary {
    border: 1px solid var(--primary);
    background-color: var(--primary-text);
    color: var(--primary);

    &:hover {
      border-color: var(--secondary);
      background-color: var(--secondary);
      color: var(--primary-text)
    }
  }

  .button {
    appearance: none;
    height: 28px;
    line-height: 14px;
    border-radius: 3px;
    padding: 6px 12px;
    transition: 0.3s;
    cursor: pointer;
    user-select: none;

    &:disabled {
      border-color: var(--disabled);
      background-color: var(--disabled);
      cursor: not-allowed;
    }
  }
</style>
