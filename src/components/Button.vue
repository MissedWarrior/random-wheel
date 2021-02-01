<template>
  <button :class="[$style.button, $style[$props.appearance]]" v-bind="$attrs">
    <slot/>
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      appearance: {
        type: String,
        default: 'primary',
        validator(val) {
          return ['primary', 'secondary'].indexOf(val) !== -1;
        },
      },
    }
  };
</script>

<style lang="scss" module>
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
    line-height: 24px;
    border-radius: 3px;
    padding: 0 8px;
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
