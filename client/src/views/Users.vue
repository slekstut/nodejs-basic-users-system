<template>
  <div class="users__container">
    <div class="users__text">
      <h1>Welcome To Users Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        vero quibusdam vel optio. Quis quaerat, odit aliquid libero molestiae
        vero?
      </p>
      <div @click="toggleUsers">
        <Button class="small">
          <span v-if="!showUsers">View All Users</span>
          <span v-if="showUsers">Hide All Users</span>
        </Button>
      </div>
    </div>
    <div v-if="showUsers">
      <h2>Users List</h2>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in allUsers" :key="index">
              <td>{{ user._id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <span><a href="#"><img src="../assets/edit-regular.svg" alt="edit-icon"></a></span>
                <span><a href="#"><img src="../assets/trash-solid.svg" alt="trash-solid"></a></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/basic/Button.vue";

export default {
  components: {
    Button
  },
  name: "Users",
  data() {
    return {
      showUsers: false
    };
  },
  created() {
    this.$store.dispatch("getUsers");
    return (this.allUsers = this.$store.getters.allUsers);
  },
  methods: {
    toggleUsers() {
      this.showUsers = !this.showUsers;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/basics/buttons.scss";
@import "../scss/views/users.scss";
</style>
