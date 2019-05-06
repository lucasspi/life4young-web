<template>
  <footer class="footer footer-dark">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-4">
          <div class="footer-logo">
            <img src="/static/l4y-Branco.png" alt="Life4young" />
          </div>
          <figure class="ssl-certification">
            <img src="/static/ssl03.png" alt="Compra segura" title="Compra segura">
          </figure>
        </div>
        <div class="column is-4">
          <div class="footer-column">
            <div class="footer-header">
              <h3>A Escola</h3>
            </div>
            <ul class="link-list">
              <li><router-link to="/">Home</router-link></li>
              <li v-if="$auth.check('view-courses')"><router-link to="/courses">Treinamentos</router-link></li>
            </ul>
          </div>
        </div>
        <div class="column is-3">
          <div class="footer-column">
            <div class="footer-header">
              <h3>Redes sociais</h3>
              <nav class="level socialnetworks is-mobile">
                <a class="level-item has-text-centered" href="https://www.facebook.com/groups/de.arquiteto.para.arquiteto" target="_blank">
                  <span class="icon">
                    <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
                  </span>
                </a>
                <a class="level-item has-text-centered" href="https://www.instagram.com/de.arquiteto.para.arquiteto/" target="_blank">
                  <span class="icon">
                    <font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon>
                  </span>
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div class="column is-12 has-text-centered">
          <div class="content">
            <p id="copyrightplaceholder"></p>
          </div>
        </div>
      </div>
    </div>
  </footer>

</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import LogoImage from '../Icons/LogoImage.vue'
  import obfuscator from '../../helpers/obfuscator'

  export default {

    name: 'footer-render',

    components: {
      LogoImage
    },

    computed: {
      ...mapGetters({'is_menu_open': 'isMenuOpen'}),
      ...mapState(['is_menu_visible', 'is_tour_open'])
    },

    data() {
      let copyrightText = "Produzido por MR TECH SOLUCOES EM TECNOLOGIA LTDA |\n" +
        "CNPJ: 28.376.868/0001-00 | \n" +
        "\n" +
        "contato@escoladearquitetos.com.br";
      return {
        copyright_text: obfuscator.encode(copyrightText)
      }
    },

    mounted() {
      let el = document.getElementById("copyrightplaceholder");
      el.innerHTML = this.copyright_text;
    },

    methods: {
      onClickToggleNavigation() {
        this.$store.commit("setMenuVisible", !this.is_menu_visible)
      }
    }
  }
</script>

<style lang="scss">
  .footer-logo {
    margin-bottom: 30px;
    text-align: center;
  }
  .ssl-certification {
    text-align: center;
    img {
      max-width: 30%;
      height: auto;
    }
  }
  #copyrightplaceholder {
    margin: 30px 0;
  }
  .level.socialnetworks {
    text-align: center;
    svg {
      font-size: 30px;
    }
  }
</style>
