<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submitSignin">
      <div class="form__group">
        <div class="form__input">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="authData.email"
            :class="{ 'is-invalid': submitted && $v.authData.email.$error }"
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
        </div>
        <div class="form__input">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="authData.password"
            :class="{ 'is-invalid': submitted && $v.authData.password.$error }"
          />
          <div
            class="error__input"
            v-if="submitted && $v.authData.password.$error"
          >
            <span class="error__input" v-if="!$v.authData.password.minLength">
              Password must be not less
              {{ $v.authData.password.$params.minLength.min }} letters.
            </span>
            <span class="error__input" v-if="!$v.authData.password.required">
              Please enter a password.
            </span>
          </div>
        </div>
        <div v-if="errorMsg" class="error">
          <p>{{ errorMsg }}</p>
        </div>
        <button type="submit" class="btn__button">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      authData: {
        email: "",
        password: ""
      },
      submitted: false,
      successMsg: "",
      errorMsg: "",
      token: ""
    };
  },
  validations: {
    authData: {
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
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        await this.$store.dispatch("login", {
          email: this.authData.email,
          password: this.authData.password
        });
        this.$router.push("/home");
      } catch (err) {
        console.log(err);
          return (this.errorMsg = this.$store.getters.error);
      }
    }
  },
  computed: {
  },

};
</script>

<style lang="scss">
$font-color: #05386b;
$light-green: #5cdb95;
$darker-green: #379683;
$white: #edf5e1;
$green: #8ee4af;
$error-dark: #d63301;
$error-light: #ffccba;

.form__group {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 10vh 5vw;
  .form__input {
    width: 30em;
    display: flex;
    flex-direction: column;
    margin: 0.8em 0;
    label {
      font-size: 1.2rem;
      color: $font-color;
      text-align: left;
      padding-bottom: 0.2em;
    }
    input {
      padding: 0.5em;
      font-size: 1.1rem;
      border-radius: 10px;
      &:focus {
        outline: none;
      }
    }
  }
  .btn__button {
    width: 30em;
    height: 4em;
    background: $darker-green;
    color: $white;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
    border: none;
    border-radius: 2em;
    margin-top: 2em;
    letter-spacing: 0.1em;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
}

.successMsg {
  color: $darker-green;
  background-color: $light-green;
  margin: 1.2em 0;
  font-size: 1.2rem;
  font-weight: 400;
  margin: 10px 0px;
  padding: 15px 20px;
  border-radius: 30px;
  border: none;
}

.is-invalid {
  border: 1px solid $error-dark;
  color: $error-dark;
}

.error {
  font-size: 1.2rem;
  font-weight: 400;
  margin: 10px 0px;
  padding: 15px 20px;
  color: $error-dark;
  background-color: $error-light;
  border-radius: 30px;
  border: none;
}

.error__input {
  color: $error-dark;
  background-color: none;
  text-align: left;
  margin: 10px 0px;
  font-size: 0.8rem;
}
</style>
