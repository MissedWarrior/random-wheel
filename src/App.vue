<template>
  <div :class="$style.app">
    <Header @open-modal="isModalOpen = true"/>
    <div :class="$style.main">
      <Button appearance="secondary">Test</Button>
    </div>
    <Footer/>

    <teleport to="body">
      <Modal v-if="isModalOpen" @close-modal="isModalOpen = false">
        <Settings/>
      </Modal>
    </teleport>
  </div>
</template>

<script>
  import Button from '/@/components/Button.vue';
  import Modal from '/@/components/Modal.vue';

  import Header from '/@/layout/Header.vue';
  import Footer from '/@/layout/Footer.vue';

  import Settings from '/@/app/Settings/Settings.vue';

  export default {
    name: 'App',
    components: { Modal, Footer, Header, Button, Settings },
    data() {
      return {
        isModalOpen: false,
      };
    },
    provide: {
      configKey: 'roulette-data',
    }
  };
</script>

<style module lang="scss">
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .main {
    flex: 1;
  }
</style>
