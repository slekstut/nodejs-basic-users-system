<template>
  <div>
    <h1>Secret page</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
      vero quibusdam vel optio. Quis quaerat, odit aliquid libero molestiae
      vero?
    </p>
    <h3>List of users</h3>
    <div class="users__list" v-if="users.length > 0">
      <ul v-for="(user, index) in users" :key="index">
        <li><b>User name:</b> {{ user.username }}</li>
        <li><b>User email:</b> {{ user.email }}</li>
        <li><b>User ID:</b> {{ user._id }}</li>
        <li><b>User role:</b> {{ user.role }}</li>
      </ul>
    </div>
    <div v-else>No users found in the database.</div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "SecretPage",
  data() {
    return {
      users: [],
    };
  },
  created() {
    let self = this
    eventBus.$on("sendtoken", (token) => {
      axios
        .get("http://localhost:3000/auth/all-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(token)
          console.log(response.data.users);
          self.users = response.data.users;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
};
</script>

<style scoped lang="scss">
.users__list {
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    li {
      text-align: left;
    }
  }
}
</style>
