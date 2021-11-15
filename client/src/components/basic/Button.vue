<template>
  <button type="submit" class="submit__button" :class="{ disabled: isLoading }">
    <slot></slot><span><SpinnerButton v-if="isLoading"></SpinnerButton></span>
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
