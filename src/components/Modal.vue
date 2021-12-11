<template>
  <div :class="$style.backdrop" @click.self="closeModal">
    <div :class="$style.modal">
      <div :class="$style.closeButton" @click="closeModal">
        <CloseIcon/>
      </div>
      <slot/>
    </div>
  </div>
</template>

<script>
  import CloseIcon from './CloseIcon.vue';

  export default {
    name: 'Modal',
    components: { CloseIcon },
    emits: {
      'close-modal': null,
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
    },
  };
</script>

<style module>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(var(--modal-bc), 0.6);
  }

  .modal {
    max-width: 700px;
    width: 100%;
    background-color: var(--modal-fill);
    border-radius: 3px;
    border: 1px solid var(--border);
    padding: 30px;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
