<template>
  <div>
    <FlashMessage :position="'right bottom'"></FlashMessage>
    <div class="form">
      <h1>Signup</h1>
      <form @submit.prevent="submitSignup">
        <div class="form__group">
          <div class="form__group__input">
            <label for="username">Name</label>
            <input
              name="username"
              id="username"
              :class="{
                'is-invalid': submitted && $v.authData.username.$error
              }"
              type="text"
              v-model="authData.username"
            />
            <div
              class="error__input"
              v-if="submitted && $v.authData.username.$error"
            >
              <span class="error__input" v-if="!$v.authData.username.required">
                Name is required.
              </span>
              <span class="error__input" v-if="!$v.authData.username.minLength">
                Name must have at least
                {{ $v.authData.username.$params.minLength.min }} letters.
              </span>
            </div>
          </div>
          <div class="form__group__input">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="authData.email"
              @input="clearErrorEmail"
              :class="{
                'is-invalid':
                  (submitted && $v.authData.email.$error) || errorMsg.email
              }"
            />
            <div
              class="error__input"
              v-if="submitted && $v.authData.email.$error"
            >
              <span class="error__input" v-if="!$v.authData.email.required">
                Email is required.
              </span>
              <span class="error__input" v-if="!$v.authData.email.email">
                Please enter a valid email address.
              </span>
            </div>
            <div class="error__input" v-if="errorMsg.email">
              <span class="error__input">{{ errorMsg.email }}</span>
            </div>
          </div>
          <div class="form__group__input">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              v-model="authData.password"
              :class="{
                'is-invalid': submitted && $v.authData.password.$error
              }"
            />
            <div
              class="error__input"
              v-if="submitted && $v.authData.password.$error"
            >
              <span class="error__input" v-if="!$v.authData.password.required">
                Please enter a password.
              </span>
              <span class="error__input" v-if="!$v.authData.password.minLength">
                Password must be not less
                {{ $v.authData.password.$params.minLength.min }} letters.
              </span>
            </div>
          </div>
          <div class="form__group__input">
            <label for="c_password">Confirm Password</label>
            <input
              type="password"
              name="c_password"
              id="c_password"
              v-model="authData.cPassword"
              :class="{
                'is-invalid': submitted && $v.authData.cPassword.$error
              }"
            />
            <div
              class="error__input"
              v-if="submitted && $v.authData.cPassword.$error"
            >
              <span
                class="error__input"
                v-if="!$v.authData.cPassword.sameAsPassword"
              >
                Passwords must identical.
              </span>
            </div>
          </div>
          <button type="submit" class="submit__button">
            Signup
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      authData: {
        username: "",
        email: "",
        password: "",
        cPassword: ""
      },
      submitted: false,
      errorMsg: {
        email: ""
      }
    };
  },
  validations: {
    authData: {
      username: {
        required,
        minLength: minLength(5)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(5)
      },
      cPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  methods: {
    async submitSignup() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        await this.$store.dispatch("signup", {
          username: this.authData.username,
          email: this.authData.email,
          password: this.authData.password
        });
        this.flashMessage.success({
          title: "You have been successfully registered! Please login.",
          message: `Welcome ${this.authData.username}`,
          time: 5000,
          blockClass: "successMsg"
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 4000);
      } catch (err) {
        console.log(err);
        if (this.$store.getters.error == "Email address already exists!") {
          this.errorMsg.email = this.$store.getters.error;
        }
      }
    },
    clearErrorEmail() {
      this.errorMsg.email = "";
    }
  }
};
</script>

<style lang="scss">
@import "../scss/basics/buttons.scss";
@import "../scss/basics/errors.scss";
@import "../scss/views/forms.scss";
</style>
