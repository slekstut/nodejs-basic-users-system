<template>
  <div>
    <div>
      <h1>Welcome {{ authUser }}</h1>
      <div>
        <h3>Your Account information</h3>
        <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
              <td>{{ loggedInUser.userId }}</td>
              <td>{{ loggedInUser.username }}</td>
              <td>{{ loggedInUser.email }}</td>
              <td>{{ loggedInUser.role }}</td>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      loggedInUser: [],
    };
  },
  computed: {
    authUser() {
      return this.$store.getters.user.username;
    },
  },
  created() {
    console.log(this.$store.getters.user);
    return (this.loggedInUser = this.$store.getters.user);
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/views/userprofile.scss";
</style>