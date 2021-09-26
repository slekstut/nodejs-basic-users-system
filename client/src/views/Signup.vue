<template>
  <div>
    <h1>Signup</h1>
    <form
      action="http://localhost:3000/auth/signup"
      method="POST"
      @submit.prevent="submitSignup"
    >
      <div class="form__group">
        <div class="form__input">
          <label for="username">Name</label>
          <input
            name="username"
            id="username"
            :class="{ 'is-invalid': submitted && $v.authData.username.$error }"
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
            <span class="error__input" v-if="!$v.authData.password.required">
              Please enter a password.
            </span>
            <span class="error__input" v-if="!$v.authData.password.minLength">
              Password must be not less
              {{ $v.authData.password.$params.minLength.min }} letters.
            </span>
          </div>
        </div>
        <div class="form__input">
          <label for="c_password">Confirm Password</label>
          <input
            type="password"
            name="c_password"
            id="c_password"
            v-model="authData.cPassword"
            :class="{ 'is-invalid': submitted && $v.authData.cPassword.$error }"
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
        <span class="successMsg">{{ successMsg }}</span>
        <span class="error" v-if="errorMsg">{{ errorMsg }}</span>
        <button type="submit" class="btn__button">
          Signup
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data() {
    return {
      authData: {
        username: "",
        email: "",
        password: "",
        cPassword: "",
      },
      submitted: false,
      successMsg: "",
      errorMsg: "",
    };
  },
  validations: {
    authData: {
      username: {
        required,
        minLength: minLength(5),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(5),
      },
      cPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    submitSignup() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return; // stop here if form is invalid
      }
      axios
        .post("http://localhost:3000/auth/signup", this.authData)
        .then((res) => {
          console.log(res.data);
          // this.authData.username = "";
          // this.authData.email = "";
          // this.authData.password = "";
          // this.authData.cPassword = "";
          this.$v.$reset();
          this.successMsg = res.data.message;
          setTimeout(() => {
            this.successMsg = "";
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response.data.data[0].msg);
          this.errorMsg = err.response.data.data[0].msg;
          setTimeout(() => {
            this.errorMsg = "";
          }, 3000);
        });
    },
  },
};
</script>

<style lang="scss">
$font-color: #05386b;
$light-green: #5cdb95;
$darker-green: #379683;
$white: #edf5e1;
$green: #8ee4af;

.form__group {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 10vh 5vw;
  .successMsg {
    color: $darker-green;
    margin: 1.2em 0;
    font-size: 1.2rem;
    font-weight: 600;
  }
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
      &:focus {
        outline: none;
      }
    }
    .error__input {
      color: red;
      text-align: left;
      margin-top: 0.2em;
      font-size: 0.8rem;
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

.is-invalid {
  border: 1px solid red;
  color: red;
}

.error {
  color: red;
  margin: 1.2em 0;
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
