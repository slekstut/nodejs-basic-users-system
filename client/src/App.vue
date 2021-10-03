<template>
  <div class="app">
    <router-link :to="{ name: 'Signup' }"
      ><button class="btn__button">Signup</button></router-link
    >
    <router-link to="/login"
      ><button class="btn__button" @click="login" v-if="!isAuth">Login</button></router-link
    >
    <button class="btn__button" @click="logout" v-if="isAuth">Logout</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
  },
  methods: {
    login() {
      this.$store.dispatch('login');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/');
    },
  },
  computed: {
    // ...mapGetters(["isLoggedIn"]),
    isAuth() {
      return this.$store.getters.userIsAuthenticated;
    }
  },
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
  margin-top: 60px;
  .btn__button {
    width: 10em;
    height: 4em;
    background: $darker-green;
    color: $white;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
    border: none;
    border-radius: 2em;
    margin-top: 2em;
    margin-right: 1em;
    letter-spacing: 0.1em;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
}
</style>
