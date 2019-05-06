<template>
  <div  class="navbar" role="navigation" aria-label="dropdown navigation">
    <div v-if="false" class="navbar-item has-dropdown is-hoverable ">
      <a id="arrow" class="is-vcentered navbar-item" style="height: 100%; ">
        <font-awesome-icon icon="bell" style="color: #bababa; font-size: 18px; margin-right: 10px;"></font-awesome-icon>
      </a>
      <div class="navbar-dropdown is-right" style="z-index: 50; top: 4.73rem;">
        <div class="columns navbar-item">
          <div style=" background-color: #ff6126; border-radius: 50%; margin-right: 10px;">
            <font-awesome-icon icon="video" class="iconNotification"></font-awesome-icon>
          </div>
          <p class="" style="font-weight: 600; font-size: 13px;">VIDEO<br>
            <a class="" style="font-weight: 600;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo</a>
          </p>

        </div>

        <hr class="navbar-divider">
        <div class="columns navbar-item">
          <div style=" background-color: #40a6f9; border-radius: 50%; margin-right: 10px;">
            <font-awesome-icon icon="mail-bulk" class="iconNotification"></font-awesome-icon>
          </div>
          <p class="" style="font-weight: 600; font-size: 13px;">POST<br>
            <a class="" style="font-weight: 600;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo</a>
          </p>

        </div>
        <hr class="navbar-divider">
        <div class="columns navbar-item">
          <div style=" background-color: #324258; border-radius: 50%; margin-right: 10px;">
            <font-awesome-icon icon="microphone-alt" style="color: white; font-size: 35px; padding: 10px; height: 40px; width: 40px;"></font-awesome-icon>
          </div>
          <p class="" style="font-weight: 600; font-size: 13px;">PODCAST<br>
            <a class="" style="font-weight: 600;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo</a>
          </p>

        </div>
        <hr class="navbar-divider">
      </div>
    </div>
    <div class="navbar-end" style="background-color: #334258; height: 80px;">
      <div class="navbar-item">
        <div class="buttons">
          <div class="button " style="background: transparent; border: transparent;">

            <img v-if="$auth.user().avatar" :src="$auth.user().avatar.image_url" style="border-radius: 50%; width:35px; height: 35px; " class="is-32x32">
            <router-link to="/profile" style="text-align: left; color: white; font-weight: 700; line-height:1.1; padding-left:15px;">
            {{$auth.user().name}}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div>

    <div class="navbar-item has-dropdown is-hoverable is-right" style="background-color: #293341; height: 100%; ">
      <a class="navbar-link" style=""></a>
      <div class="navbar-dropdown is-right" style="z-index: 50; top: 4.73rem;">

        <router-link to="/profile">
        <a class="navbar-item" style="">
          Meu Perfil
        </a>
        </router-link>

        <hr class="navbar-divider">
        <a class="navbar-item" style="" @click="doLogout()">
            <font-awesome-icon icon="sign-out-alt" style="color: #bababa; font-size: 18px; margin-right: 10px;"></font-awesome-icon>
            Logout
          </a>
        </div>
      </div>
    </div>
</div>
</template>
<script>

  export default {

    name: 'navbar-user',

    components: {

    },

    computed: {

    },

    data() {
      return {
        // toggleMenu: true
      }
    },

    methods: {
      onClickToggleNavigation() {
        this.$store.commit("setMenuVisible", !this.is_menu_visible)
      },
      doLogout() {
        this.$auth.logout({redirect: '/', makeRequest: false})
        this.onClickToggleNavigation()
        this.$store.dispatch('onesignal/logoutEmail')
      }
    }
  }
</script>

<style lang="scss">
.iconNotification{
  color: white;
  font-size: 35px;
  padding: 10px;
  height: 40px;
  width: 40px;
}
.centeringVertically{
  position: absolute;
  top: 50%;
}



</style>
