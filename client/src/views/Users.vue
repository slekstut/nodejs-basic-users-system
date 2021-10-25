<template>
  <div class="users__container">
    <div class="users__text">
      <h1>Secret page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        vero quibusdam vel optio. Quis quaerat, odit aliquid libero molestiae
        vero?
      </p>
      <button @click="showUsers = !showUsers">
        <span v-if="!showUsers">View All Users</span
        ><span v-if="showUsers">Hide All Users</span>
      </button>
    </div>
    <div v-if="showUsers">
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
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      showUsers: false,
      allUsers: []
    };
  },
  computed: {
  },
  methods: {},
  created() {
    this.$store.dispatch("getUsers");
    return (this.allUsers = this.$store.getters.allUsers);
  }
};
</script>

<style scoped lang="scss">
.users__container {
  .users__text {
    margin-bottom: 3em;
  }
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
