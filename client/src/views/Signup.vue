<template>
  <div>
    <h1>Signup page</h1>
    <form @submit.prevent="submitSignup">
      <div class="form__group">
        <div class="form__input">
          <label for="name">Name</label>
          <input type="text" v-model.trim="$v.authData.name.$model" />
          <div class="error" v-if="!$v.authData.name.required">Name is required.</div>
          <div class="error" v-if="!$v.authData.name.minLength">Name must have at least {{ $v.authData.name.$params.minLength.min }} letters.</div>
        </div>
        <div class="form__input">
          <label for="email">Email</label>
          <input type="email" v-model="$v.authData.email.$model" />
          <div class="error" v-if="!$v.authData.email.required">Email is required.</div>
          <div class="error" v-if="!$v.authData.email.email">Please enter a valid email address.</div>
        </div>
        <div class="form__input">
          <label for="password">Password</label>
          <input type="password" v-model="$v.authData.password.$model" />
          <div class="error" v-if="!$v.authData.password.required">Please enter a password.</div>
          <div class="error" v-if="!$v.authData.password.minLength">Password must be not less {{ $v.authData.password.$params.minLength.min }} letters.</div>
        </div>
        <div class="form__input">
          <label for="c_password">Confirm Password</label>
          <input type="password" v-model="$v.authData.cPassword.$model" />
          <div class="error" v-if="!$v.authData.cPassword.sameAsPassword">Passwords must identical.</div>
        </div>
        <button type="submit" class="btn__button">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      authData: {
        name: "",
        email: "",
        password: "",
        cPassword: "",
      },
    };
  },
  validations: {
    authData: {
      name: {
        required,
        minLength: minLength(5),
      },
      email: {
        required,
        email
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
      console.log(this.authData.name);
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
      &:focus {
        outline: none;
      }
    }
    .error {
     color: red;
     text-align: left;
     margin-top: .2em;
     font-size: .8rem;
    }
  }
  .btn__button {
    width: 80%;
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
</style>
