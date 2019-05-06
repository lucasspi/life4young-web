<template>
<div>
  <section class="hero is-link is-small ">
    <div class="hero-body container">
      <div class="columns">
        <div class="column is-3-desktop"></div>
        <div class="column is-6-desktop is-12-mobile">
        <h1 class="title mainTextCatalog">
          Catálogo de pessoas certificadas
        </h1>
          <div id="search">
            <div class="field is-grouped">
              <p class="control is-expanded">
                <select name="estados-brasil" class="input btnSearch">
                  <option>Selecione um estado para filtrar ▼</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </p>
            </div>
          </div>
        </div>
        <div class="column is-3-desktop"></div>
      </div>
    </div>
  </section>
  <section class="section container">
    <div class="columns is-desktop is-mobile" style="margin-top: 5px;">

      <div class="column is-4-desktop is-4-mobile" style="margin-right: 5px; border: 1px solid #d6d6d6; text-align: center;">
        <router-link to="/perfil">
          <img class="is-rounded avatar-img is-centered" v-if="user && user.avatar && user.avatar.image_url" :src="user.avatar.image_url">
          <img class="is-rounded avatar-img is-centered" v-else src="/static/perfil.png">
          <h3 class="subtitle is-7" >@nickname</h3>
          <h3 class="title is-6">José Fonsceca da Silva</h3>
          <p class="subtitle is-6" >São Paulo - SP</p>
        </router-link>
      </div>
      <div class="column is-4-desktop is-4-mobile " style="margin-right: 5px; border: 1px solid #d6d6d6; text-align: center;">
        <router-link to="/perfil">
          <img class="is-rounded avatar-img is-centered" v-if="user && user.avatar && user.avatar.image_url" :src="user.avatar.image_url">
          <img class="is-rounded avatar-img is-centered" v-else src="/static/perfil.png">
          <h3 class="subtitle is-7" >@nickname</h3>
          <h3 class="title is-6">José Fonsceca da Silva</h3>
          <p class="subtitle is-6" >São Paulo - SP</p>
        </router-link>
      </div>
      <div class="column is-4-desktop is-4-mobile" style="margin-right: 5px; border: 1px solid #d6d6d6; text-align: center;">
        <router-link to="/perfil">
          <img class="is-rounded avatar-img is-centered" v-if="user && user.avatar && user.avatar.image_url" :src="user.avatar.image_url">
          <img class="is-rounded avatar-img is-centered" v-else src="/static/perfil.png">
          <h3 class="subtitle is-7" >@nickname</h3>
          <h3 class="title is-6">José Fonsceca da Silva</h3>
          <p class="subtitle is-6" >São Paulo - SP</p>
        </router-link>
      </div>
    </div>
  </section>
</div>
</template>
<script>

export default {

  data(){

    return {
      items: [1,2],
      tags: [1,2,3,4],

    }
  },
  methods: {

      openCategory(evt, categoryName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(categoryName).style.display = "block";

        evt.currentTarget.className += " active";
      },

    }

}
</script>
<style>
.mainTextCatalog{
  text-align: center;
  line-height: 2.9
}
.btnSearch{
  border-radius: 100px;
  height: 50px;
}
/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .mainTextCatalog{
    line-height: 1.2
  }
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
  .mainTextCatalog{
    line-height: 1.2
  }
}
</style>

