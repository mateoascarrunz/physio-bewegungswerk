<template>
    <lottie-player-wrapper class="logo">
 <lottie-player
      v-if="lottieScriptLoaded"
      class="logo"
      :src="TheLogoAnimationFile"
      background="transparent"
      speed="1"
      autoplay
    ></lottie-player>
</lottie-player-wrapper>
</template>

<script>
  import LottiePlayerWrapper from '../base/LottiePlayerWrapper.vue';
  import LogoAnimationFile from '../../assets/images/physio logo animation_newblue.json'
export default {
    components: {
      LottiePlayerWrapper,
    },
  data() {
    return {
      lottieScriptLoaded: false,
      TheLogoAnimationFile: LogoAnimationFile,
  
    };
  },
  mounted() {
    // Load the LottiePlayer script using vue-plugin-load-script
    this.$loadScript('https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js')
      .then(() => {
        // The script has loaded, set the flag to true
        this.lottieScriptLoaded = true;
      })
      .catch((error) => {
        console.error('Failed to load LottiePlayer script:', error);
      });
  },
};
</script>
