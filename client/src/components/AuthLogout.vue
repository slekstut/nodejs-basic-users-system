<template>
  <div v-if="warningModal && isAuth">
    <div class="overlay">
      <div class="popup">
      <div class="popup__header">
        <h2>Are You Still Here?</h2>
        <a class="close" @click="closeWarning">&times;</a>
        </div>
        <div class="popup__body">
          You have you been inactive for a while, do want to continue?
        </div>
        <p>
          Your will be logged out in <span>{{ counter }}</span>
        </p>
        <div>
        <Button @click="closeWarning">Continue</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/basic/Button.vue";

export default {
  name: "AuthLogout",
  components: {
    Button
  },
  data() {
    return {
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      warningTimer: null,
      logoutTimer: null,
      warningModal: false,
      counter: 6,
    };
  },
  mounted() {
    if (!this.warningModal && this.isAuth) {
      this.events.forEach(event => {
        window.addEventListener(event, this.resetTimer);
      });
      this.setTimers();
    }
  },
  destroyed() {
    if (this.warningModal && !this.isAuth) {
    this.events.forEach(event => {
      window.removeEventListener(event, this.resetTimer);
    });
    this.resetTimer();
    }
  },
  methods: {
    setTimers() {
      this.warningTimer = setTimeout(this.warningMessage, 14 * 60 * 1000); // [14 * 60 * 1000] 14 minutes
      this.logoutTimer = setTimeout(this.logoutUser, 15 * 60 * 1000); // [15 * 60 * 1000] 15min
    },
    warningMessage() {
      this.warningModal = true;
      this.counter = 6;
      this.countDown();
    },
    async logoutUser() {
      try {
        await this.$store.dispatch("logout");
        this.warningModal = false;
        await this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    resetTimer() {
      clearTimeout(this.warningTimer);
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },
    countDown() {
      if (this.counter > 0) {
        setTimeout(() => {
          this.counter--;
          this.countDown();
        }, 1000);
      }
    },
    closeWarning() {
      this.warningModal = false;
      this.resetTimer();
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.userIsAuthenticated;
    }
  }
};
</script>

<style lang="scss">
@import "../scss/components/authlogout.scss";
</style>
