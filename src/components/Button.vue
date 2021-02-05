<template>
  <button
    :class="[$style.button, $style[$props.appearance], $style[$props.view]]"
    v-bind="$attrs"
  >
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
          return ['primary', 'secondary', 'danger'].indexOf(val) !== -1;
        },
      },
      view: {
        type: String,
        default: 'default',
        validator(val) {
          return ['default', 'squared'].indexOf(val) !== -1;
        }
      }
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

  .danger {
    border: 1px solid var(--error);
    background-color: var(--primary-text);
    color: var(--error);

    &:hover {
      background-color: var(--error-dark);
      border-color: var(--error-dark);
      color: var(--primary-text);
    }
  }

  .button {
    appearance: none;
    border-radius: 3px;
    transition: 0.3s;
    cursor: pointer;
    user-select: none;

    &:disabled {
      border-color: var(--disabled);
      background-color: var(--disabled);
      cursor: not-allowed;
    }
  }

  .default {
    padding: 6px 12px;
    height: 28px;
    line-height: 14px;
  }

  .squared {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
  }
</style>
