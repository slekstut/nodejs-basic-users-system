<template>
  <div class="app">
    <Navbar />
    <AuthLogout/>
    <router-view class="content"></router-view>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import AuthLogout from "./components/AuthLogout.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    AuthLogout
  },
  methods: {
  },
  computed: {
  },
};
</script>

<style lang="scss">
@import "./scss/app.scss";
</style>
