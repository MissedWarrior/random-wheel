<template>
  <a v-bind="allProps">
    <slot/>
  </a>
</template>

<script>
  export default {
    name: 'Link',
    props: {
      isExternalLink: {
        type: Boolean,
      }
    },
    computed: {
      allProps() {
        const additionalProps = {};

        if (this.isExternalLink) {
          additionalProps.target = '_blank';
          additionalProps.rel = 'nofollow noopener noreferrer';
        }

        return {
          ...this.$attrs,
          ...additionalProps,
        };
      }
    }
  };
</script>
