<template>
  <div class="projects-page">
    <hero-section set-classes="is-primary is-bold">
      <div class="container">
        <h1 class="title">
          {{ $t('groups.title') }}
        </h1>
      </div>
    </hero-section>
    <div class="container">
      <div class="columns is-centered is-multiline">
        <div v-for="group in groups" :key="group.id" class="column group is-8 tile is-parent">
          <a :href="group.link" target="_blank">
            <!-- <article class="tile is-child box" :style="`background-image: url(${course.thumb_url});`"> -->
            <div class="tile is-child box">
              <article class="media">
                <figure class="media-left">
                  <p class="image is-96x96">
                    <img :src="group.thumb" :alt="group.name">
                  </p>
                </figure>
                <div class="media-content">
                  <h2 class="title">{{ group.name }}</h2>
                  <div class="content" v-html="group.description">
                  </div>
                  <a :href="group.link" class="button is-primary is-small">Acessar grupo</a>
                </div>
              </article>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeroSection from './HeroSection.vue'
export default {
  components: {HeroSection},

  data() {
    return {
      groups: [
        {
          id: 1,
          name: 'De arquiteto, para arquiteto',
          description: '<p>Divulgue seus projetos no google com a hashtag <a>#socialguider</a></p>',
          link: 'https://www.facebook.com/groups/de.arquiteto.para.arquiteto/?fref=nf',
          thumb: 'https://esteira.nyc3.digitaloceanspaces.com/content/images/37293314_1459481360864280_3667891749977587712_n.jpg'
        },
        {
          id: 1,
          name: 'Social Guider',
          description: '<p>Ajude-nos a melhorar a plataforma, contribua com ideias</p>',
          link: 'https://www.facebook.com/groups/social.guider/',
          thumb: 'https://esteira.nyc3.digitaloceanspaces.com/content/images/logoGRUPO.png'
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "../assets/mixins.scss";
.group {
  .title {
    margin-bottom: 5px;
  }
  > a {
    display: block;
    width: 100%;
    .box {
      transition: 0.3s all;
    }
  }
}
</style>
