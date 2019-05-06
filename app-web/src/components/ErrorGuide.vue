<template>
  <div>
  <section>
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <vue-material-icon name="error"></vue-material-icon>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ $t('error_guide.status_title.http' + error_code) }}</p>
          </div>
        </div>

        <div class="content">
          <vue-typer :text="$t('error_guide.status_message.http' + error_code)" :repeat="0"></vue-typer>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
import Logo from "./Logo.vue";

export default {
  name: "Login",

  components: {
    Logo
  },

  data() {
    return {
      error_code: -1
    };
  },



	beforeRouteEnter(to, from, next) {
		next(vm => vm.setErrorCode(to.meta.error_code));
  },

  beforeRouteUpdate(to, from, next) {
    this.setErrorCode(to.meta.error_code);
    next();
  },

  methods: {
    setErrorCode(errorCode) {
      this.error_code = errorCode;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/mixins.scss";

// .main-content {
// 	margin: 0;
// }

.error-guider {
  // @include defaultGradient();
  .logo {
    img {
      @include opacity(1);
      width: 290px;
      margin: 0 0 20px;

      @media screen and (max-width: 991px) {
        width: 70px;
        height: auto;
        margin: 0 auto 28px;
      }
    }
  }
  input {text-align: center}

  .links {
    text-align: center;

    li {
      display: inline-block;
      margin: 0 7px;
      a {
        color: $branco;
      }
    }
  }
}
</style>
