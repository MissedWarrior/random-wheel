<template>
  <div :class="$style.app">
    <Header/>
    <div :class="$style.main">
      <Button @click="test" appearance="secondary">Test</Button>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Button from '/@/components/Button.vue';
  import Header from '/@/components/Header.vue';
  import Footer from '/@/components/Footer.vue';

  export default {
    name: 'App',
    components: { Footer, Header, Button },
    methods: {
      test(e) {
        console.log(e);
      }
    }
  }
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
