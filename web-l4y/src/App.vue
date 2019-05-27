<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <section class="hero is-default is-bold">
      <navbar></navbar>
      <navbar-mobile></navbar-mobile>
    </section>
    <transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view />
    </transition>
    
  </div>
</template>
<script>
import Navbar from "./components/Navbar/Navbar";
import NavbarMobile from "./components/Navbar/NavbarMobile";

export default {
  components: {
    NavbarMobile,
    Navbar
  }
}
</script>

<style lang="scss">
@import "./assets/styles/app";
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
