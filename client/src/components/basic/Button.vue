<template>
  <button type="submit" class="btn instagram" :class="{ disabled: isLoading }">
    <span :class="{ loading: isLoading }"></span>
    <slot></slot>
    <span class="gradient"></span>
    <span>
      <SpinnerButton v-if="isLoading"></SpinnerButton>
    </span>
  </button>
</template>

<script>
import SpinnerButton from "./Spinner";

export default {
  components: {
    SpinnerButton
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  }
};
</script>
