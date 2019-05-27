<template>
	<div class="navbar-item">
    <a v-if="linkToLandingPage" :href="landingPageUrl">
      <logo-image></logo-image>
    </a>
		<router-link v-else to="/" class="logo" style="padding: 0px 10px;">
      <logo-image></logo-image>
		</router-link>
	</div>
</template>

<script>
  import LogoImage from './Icons/LogoImage.vue'
export default {
  name: "Logo",

  components: {
    LogoImage
  },

  props: ['link-to-landing-page'],

  data() {
    return {
      appBrand: process.env.APP_BRAND,
      landingPageUrl: process.env.LANDING_PAGE_URL
    };
  }
};
</script>

<style lang="scss">
@import "../assets/mixins.scss";

.logo {
  svg {
    fill: $branco;
    margin: 7px 0;
    @include opacity(0.8);
    @include transition(0.4s);
  }

  &:hover {
    svg {
      @include opacity(1);
    }
  }

  .logo-desktop {
    width: 140px;
    height: auto;
  }

  .logo-reponsiva {
    display: none;
  }

  @media screen and (max-width: 940px) {
    .logo-desktop {
      display: none;
    }

    .logo-reponsiva {
      display: block;

      width: 40px;
      height: auto;
    }
  }
}
</style>
