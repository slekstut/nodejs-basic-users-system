<template>
  <div>
    <h1>Signup page</h1>
    <form action="">
      <div class="form__group">
        <div class="form__input">
          <label for="name">Name</label>
          <input type="text" />
        </div>
        <div class="form__input">
          <label for="email">Email</label>
          <input type="email" />
        </div>
        <div class="form__input">
          <label for="password">Password</label>
          <input type="password" />
        </div>
        <div class="form__input">
          <label for="c_password">Confirm Password</label>
          <input type="password" />
        </div>
        <button type="submit" class="btn__button">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
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
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: .8em 0;
    label {
      font-size: 1.2rem;
      color: $font-color;
      text-align: left;
      padding-bottom: 0.2em;
    }
    input {
      padding: 0.5em;
    }
  }
  .btn__button {
    width: 80%;
    height: 4em;
    background: $darker-green;
    color: $white;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
    border: none;
    border-radius: 2em;
    margin-top: 2em;
    letter-spacing: .1em;
  }
}
</style>
