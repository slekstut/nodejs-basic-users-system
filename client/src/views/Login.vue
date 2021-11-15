<template>
  <div>
    <div class="form">
      <h1>Please Sign In</h1>
      <form @submit.prevent="submitSignin">
        <div class="form__group">
          <div class="form__group__input">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="login.email"
              @input="clearErrorEmail"
              :class="{
                'is-invalid':
                  (submitted && $v.login.email.$error) || errorMsg.email
              }"
            />
            <div
              class="error__input"
              v-if="(submitted && $v.login.email.$error) || errorMsg.email"
            >
              <span class="error__input" v-if="!$v.login.email.required">
                Email is required.
              </span>
              <span class="error__input" v-if="!$v.login.email.email">
                Please enter a valid email address.
              </span>
              <span class="error__input">
                {{ errorMsg.email }}
              </span>
            </div>
          </div>
          <div class="form__group__input">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              v-model="login.password"
              @input="clearErrorPassword"
              :class="{
                'is-invalid':
                  (submitted && $v.login.password.$error) || errorMsg.password
              }"
            />
            <div
              class="error__input"
              v-if="submitted && $v.login.password.$error & errorMsg.password"
            >
              <span class="error__input" v-if="!$v.login.password.minLength">
                Password must be not less
                {{ $v.login.password.$params.minLength.min }} letters.
              </span>
              <span class="error__input" v-if="!$v.login.password.required">
                Please enter a password.
              </span>
            </div>
            <span class="error__input" v-if="errorMsg.password">
              {{ errorMsg.password }}
            </span>
          </div>
          <Button>Login</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import Button from '../components/basic/Button.vue';

export default {
  components: {
    Button
  },
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      submitted: false,
      errorMsg: {
        email: "",
        password: ""
      },
      token: "",
    };
  },
  validations: {
    login: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(5)
      }
    }
  },
  methods: {
    async submitSignin() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.submitted = true;
      try {
        await this.$store.dispatch("login", {
          email: this.login.email,
          password: this.login.password
        });
        this.$router.push("/users");
      } catch (err) {
        console.log(err);
        if (
          this.$store.getters.error ==
          "A user with this email could not be found."
        ) {
          this.errorMsg.email = this.$store.getters.error;
        }
        if (this.$store.getters.error == "Wrong password!") {
          this.errorMsg.password = this.$store.getters.error;
        }
      }
    },
    clearErrorEmail() {
      this.errorMsg.email = "";
    },
    clearErrorPassword() {
      this.errorMsg.password = "";
    }
  },
  
};
</script>

<style lang="scss">
@import "../scss/basics/buttons.scss";
@import "../scss/basics/errors.scss";
@import "../scss/views/forms.scss";
</style>
