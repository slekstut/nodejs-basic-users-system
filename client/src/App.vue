<template>
  <div class="app">
    <Navbar />
    <router-view class="content"></router-view>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  methods: {
  },
  computed: {
  }
};
</script>

<style lang="scss">
@import "./scss/app.scss";
</style>
