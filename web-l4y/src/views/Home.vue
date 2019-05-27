<template>
  <div class="home-custom-style">
    <section class="jumbotron text-center bg-overlay">
      <div class="container">
        <p class="text-white h4">SEJA BEM VINDO AO</p>
        <h1 class="display-1 font-weight-bolder">LIFE4YOUNG</h1>
        <p class="text-white h6">Uma plataforma global feita para escutar e solucionar as dores mais latentes dos jovens das igrejas.</p>
        <p>
          <router-link to="/about">
            <a href="#" class="btn btn-rounded btn-primary my-2">JUNTE-SE A NÓS</a>
          </router-link>

        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<style lang="scss">
.home-custom-style{
  .bg-overlay {
    background: linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url('../assets/imgs/l4y-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
    color: #fff;
    height: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-rounded{
    border-radius: 100px;
    padding: 15px;
    background-color: #faa503;
    border: transparent;
    font-weight: 700;
    padding-right: 25px;
    padding-left: 25px;
  }
  .btn-rounded:hover{
    background-color: #fa8200;
  }

}


</style>
