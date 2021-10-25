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
    <h3>List of users</h3>
    <div v-if="showUsers" class="users__list">
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
$darker-green: #379683;
.users__container {
  .users__text {
    margin-bottom: 3em;
    width: 100%;
  }
  .users__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 2fr));
    grid-gap: 1rem;
    .users__item {
      text-align: left;
      border-bottom: 1px $darker-green solid;
      border-left: 1px $darker-green solid;
      padding: .6em .5em;
    }
  }
}
</style>
