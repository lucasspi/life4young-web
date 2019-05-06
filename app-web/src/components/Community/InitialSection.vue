<template>
<div>
  <section id="previousPage">
    <div class="Breadcrumbs">
      <div class="Breadcrumbs-holder u-row-wrapper">
          <router-link class="Breadcrumbs-link"  to="/community">&lt; Comunidade</router-link>
      </div>
    </div>
  </section>

</div>
</template>

<script>
export default {

  name: 'initial-section',
  props: ['active'],
  components: {

  },

}
</script>

<style>
#previousPage{
    background-color: #f3f3f6;
    padding-top: 15px;
    padding-bottom: 15px;


}
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
#previousPage{

    padding-left: 20px;
}
}

@media only screen and (min-width: 48em){
.Breadcrumbs {
    padding: 1em 0;
}
}

.u-row-wrapper {
    max-width: 1024px;
    margin: 0 auto !important;
}
.Breadcrumbs-link {
    font-size: 14px;
    font-weight: bold;
    color: #0791e6;
    text-decoration: none;

}
</style>
