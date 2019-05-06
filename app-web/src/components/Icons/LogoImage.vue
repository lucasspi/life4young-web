<template>
  <span>
    <span v-if="appBrand == 'socialguider'">
      <img src="/static/sg.svg" alt="">
    </span>
    <span v-if="appBrand == 'abcogen'">
      <img src="/static/logo_cogen.jpg" style="width:190px;" alt="ABCOGEN" />
    </span>
    <span v-if="appBrand == 'escoladearquitetos'">
      <img src="/static/logo.png" alt="" class="imageMargin"/>
    </span>
  </span>
</template>

<script>
  export default {
    name: "logo-image",

    data() {
      return {
        appBrand: process.env.APP_BRAND
      };
    }
  };
</script>

<style lang="scss">
@media only screen  and (min-width : 1224px) {
.imageMargin{
  margin-left: 130px;
}
}



</style>
