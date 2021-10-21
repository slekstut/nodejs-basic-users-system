<template>
  <div class="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  methods: {
  },
  computed: {
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap");
$font-color: #05386b;
$light-green: #5cdb95;
$darker-green: #379683;
$white: #edf5e1;
$green: #8ee4af;

.app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $font-color;
  margin: 0 8vw;
}
</style>
