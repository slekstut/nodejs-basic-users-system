<template>
  <div class="container">
    <div class="logo">
      <router-link to="/"><img src="../../public/logo.svg" alt="basic-user-logo" /></router-link>
    </div>
    <div class="navbar-items">
      <ul>
        <router-link to="/"><li class="btn__button">Home</li></router-link>
        <router-link to="/users"
          ><li class="btn__button" v-if="isAuth">Users</li></router-link
        >
        <router-link to="/login"
          ><li v-if="!isAuth">
            Signin
          </li></router-link
        >
        <router-link to="/signup"><li v-if="!isAuth">Signup</li></router-link>
        <router-link to="/logout"
          ><li @click="logout" v-if="isAuth">
            Hi {{ authUser }}!<span> (Logout)</span>
          </li></router-link
        >
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.userIsAuthenticated;
    },
    authUser() {
      return this.$store.getters.user.user.username;
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
    align-items: center;
    display: flex;
    justify-content: center;
    img {
      margin: 0 2vw;
      cursor: pointer;
      width: 36px;
      height: 36px;
    }
  }
  .navbar-items {
    margin: 0 2vw;
    ul {
      align-items: center;
      display: flex;
      justify-content: center;
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
