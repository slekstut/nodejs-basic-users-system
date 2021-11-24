<template>
  <div>
    <nav class="navbar">
      <div class="navbar__logo">
        <router-link to="/"
          ><img src="../assets/users-solid.svg" alt="basic-user-logo"
        /></router-link>
      </div>
      <div class="navbar__links">
        <ul>
          <router-link class="router-link" to="/"><li>Home</li></router-link>
          <router-link class="router-link" to="/users"><li v-if="isAuth">Users</li></router-link>
          <router-link class="router-link" to="/login"><li v-if="!isAuth">Signin</li></router-link>
          <router-link class="router-link" to="/signup"><li v-if="!isAuth">Signup</li></router-link>
          <li class="router-link" v-if="isAuth"><a href=""
            ><li><img src="../assets/user-solid.svg" alt="profile-user" /></li
          ></a>
          <ul>
            <router-link class="router-link" to="/user-profile"
              ><li v-if="isAuth">My Profile</li></router-link
            >
            <router-link class="router-link" to="/"
              ><li @click="logout" v-if="isAuth">Logout</li></router-link
            >
          </ul>
          </li>
          
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        await this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    isAuth() {
      return this.$store.getters.userIsAuthenticated;
    },
    authUser() {
      return this.$store.getters.user.username;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/components/navbar.scss";
</style>
