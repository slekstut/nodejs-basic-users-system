<template>
  <div class="container">
    <div class="logo">
      <p>LOGO</p>
    </div>
    <div class="navbar-items">
      <ul>
        <router-link to="/"><li class="btn__button">Home</li></router-link>
        <router-link to="/users"
          ><li class="btn__button" v-if="isAuth">Users</li></router-link
        >
        <router-link to="/login"
          ><li @click="login" v-if="!isAuth">
            Signin
          </li></router-link
        >
        <router-link to="/signup"><li v-if="!isAuth">Signup</li></router-link>
        <router-link to="/logout"
          ><li @click="logout" v-if="isAuth">
            Logout
          </li></router-link
        >
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nabbar",
  methods: {
    login() {
      this.$store.dispatch("login");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.userIsAuthenticated;
    }
  }
};
</script>

<style lang="scss" scoped>
$font-color: #05386b;

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  .logo {
    margin: 0 2vw;
    cursor: pointer;
  }
  .navbar-items {
    margin: 0 2vw;
    ul {
      display: flex;
      justify-content: center;
      align-content: center;
      a {
        text-decoration: none;
        li {
          text-transform: lowercase;
          list-style: none;
          margin-right: 1em;
          color: $font-color;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
}
</style>
