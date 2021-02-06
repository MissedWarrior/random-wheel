<template>
  <div :class="$style.app">
    <Header @open-modal="isModalOpen = true"/>

    <div :class="$style.main">
      <Wheel/>
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
  import Wheel from '/@/app/Wheel/Wheel.vue';

  import { wheelStore } from '/@/global/wheel-store';

  export default {
    name: 'App',
    components: { Wheel, Modal, Footer, Header, Button, Settings },
    data() {
      return {
        isModalOpen: false,
      };
    },
    provide: {
      wheelStore,
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
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
