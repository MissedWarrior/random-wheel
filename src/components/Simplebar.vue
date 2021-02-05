<template>
  <div
    ref="element"
    v-bind="$attrs"
    class="wrapper"
  >
    <div class="simplebar-wrapper">
      <div class="simplebar-height-auto-observer-wrapper">
        <div class="simplebar-height-auto-observer"/>
      </div>
      <div class="simplebar-mask">
        <div class="simplebar-offset">
          <div class="simplebar-content-wrapper" ref="scrollElement">
            <div class="simplebar-content" ref="contentElement">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="simplebar-placeholder"/>
    </div>
    <div class="simplebar-track simplebar-horizontal">
      <div class="simplebar-scrollbar"/>
    </div>
    <div class="simplebar-track simplebar-vertical">
      <div class="simplebar-scrollbar"/>
    </div>
  </div>
</template>

<script>
  import SimpleBar from 'simplebar';

  export default {
    name: 'simplebar-vue',
    data() {
      return {
        instance: null,
      };
    },
    mounted() {
      const options = SimpleBar.getOptions(this.$attrs);
      this.instance = new SimpleBar(this.$refs.element, options);
    },
    beforeUnmount() {
      this.instance?.unMount();
    },
    computed: {
      scrollElement() {
        return this.$refs.scrollElement;
      },
      contentElement() {
        return this.$refs.contentElement;
      }
    }
  };
</script>

<style scoped>
  .wrapper {
    height: 100%;
  }

  .simplebar-scrollbar.simplebar-visible::before {
    background-color: var(--secondary-text);
  }
</style>
