<template>
  <div class="users__container">
    <div class="users__text">
      <h1>Secret page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        vero quibusdam vel optio. Quis quaerat, odit aliquid libero molestiae
        vero?
      </p>
      <button @click="showUsers = !showUsers" class="submit__button">
        <span v-if="!showUsers">View All Users</span
        ><span v-if="showUsers">Hide All Users</span>
      </button>
    </div>
    <div v-if="showUsers">
      <h3>List of users</h3>
      <div class="users__list">
        <div v-for="user in allUsers" :key="user.id">
          <div class="users__item">
            <div><b>User name:</b> {{ user.username }}</div>
            <div><b>User email:</b> {{ user.email }}</div>
            <div><b>User ID:</b> {{ user._id }}</div>
            <div><b>User role:</b> {{ user.role }}</div>
          </div>
        </div>
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
  computed: {},
  methods: {},
  created() {
    this.$store.dispatch("getUsers");
    return (this.allUsers = this.$store.getters.allUsers);
  }
};
</script>

<style scoped lang="scss">
@import "../scss/basics/buttons.scss";
@import "../scss/views/users.scss";
</style>
