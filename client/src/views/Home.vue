<template>
  <div class="users__container">
    <h1>Secret page</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
      vero quibusdam vel optio. Quis quaerat, odit aliquid libero molestiae
      vero?
    </p>
    <button @click="allUsers">View all users</button>
    <div v-if="allUsers.length > 0">
      <h3>List of users</h3>
      <div class="users__list">
        <ul display__users v-for="user in allUsers" :key="user.id">
          <li><b>User name:</b> {{ user.username }}</li>
          <li><b>User email:</b> {{ user.email }}</li>
          <li><b>User ID:</b> {{ user._id }}</li>
          <li><b>User role:</b> {{ user.role }}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>No users found in database!</p>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    // ...mapState({
    //   token: "token"
    // })
  },
  methods: {
    allUsers() {
    this.$store.dispatch("getUsers");
      return this.$store.getters.allUsers;

    }
  },
  mounted() {
    // this.$store.dispatch("getUsers");
  }
};
</script>

<style scoped lang="scss">
.users__container {
  margin: 15vh 15vw;
  overflow-x: hidden;
  .users__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 3px;
    grid-auto-flow: row;
    grid-template-areas:
      "display__users display__users display__users"
      "display__users display__users display__users"
      ". . .";

    .display__users {
      grid-area: display__users;
    }
    ul {
      li {
        text-align: left;
      }
    }
  }
}
</style>
