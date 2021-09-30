<template>
  <div class="users__container">
    <h1>Secret page</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
      vero quibusdam vel optio. Quis quaerat, odit aliquid libero molestiae
      vero?
    </p>
    <h3>List of users</h3>
    <div class="users__list" v-if="data.length > 0">
      <ul display__users v-for="(e, index) in data" :key="index">
        <li><b>User name:</b> {{ e.username }}</li>
        <li><b>User email:</b> {{ e.email }}</li>
        <li><b>User ID:</b> {{ e._id }}</li>
        <li><b>User role:</b> {{ e.role }}</li>
      </ul>
    </div>
    <div v-else>No users found in the database.</div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "SecretPage",
  data() {
    return {
      data: [],
    };
  },
  methods: {
    // loadUsers() {
    //   this.data = JSON.parse(localStorage.getItem("apiData"));
    //     axios
    //       .get("http://localhost:3000/auth/all-users", {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       .then((res) => {
    //         console.log(token);
    //         console.log(res.data);
    //         localStorage.setItem("apiData", JSON.stringify(res.data.users));
    //         this.data = res.data.users;
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    // },
  },
  mounted() {
    // this.loadUsers();
  },
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
