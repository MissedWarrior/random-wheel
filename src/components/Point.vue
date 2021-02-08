<template>
  <div :class="[$style.wrapper, $style[align]]" ref="wrapper">
    <div :class="$style[overflowStyle]" :title="title" ref="inner">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Point',
    props: {
      overflowStyle: {
        type: String,
        default: 'keep',
        validator(val) {
          return ['keep', 'break', 'hide'].indexOf(val) !== -1;
        },
      },
      forceTitle: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
      },
      align: {
        type: String,
        default: 'left',
        validator(val) {
          return ['left', 'center', 'right'].indexOf(val) !== -1;
        }
      }
    },
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
    background-color: transparent;
  }

  .break {
    hyphens: auto;
    word-break: break-word;
  }

  .keep {
    word-break: keep-all;
  }

  .hide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .left {
    justify-content: flex-start;
  }

  .center {
    justify-content: center;
  }

  .right {
    justify-content: flex-end;
  }
</style>
