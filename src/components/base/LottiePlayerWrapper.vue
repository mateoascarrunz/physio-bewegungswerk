<template>
    <div :class="className">
      <slot></slot>
    </div>
  </template>
  
  <script>
  
  export default {
    props: {
      className: String,
    },
    mounted() {
      const LottiePlayerElement = customElements.get('lottie-player');
      if (LottiePlayerElement) {
        Vue.component('lottie-player', LottiePlayerElement);
        this.$emit('lottiePlayerRegistered');
      }
    },
  };
  </script>
  