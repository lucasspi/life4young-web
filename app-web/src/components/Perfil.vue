<template>
<div>
  <section style="background-color: #f3f3f6" class="section">
    <div class="columns is-mobile content is-vertical-center is-multiline is-centered">
      <div class="column is-12-mobile is-hidden-desktop is-hidden-tablet">
        <figure class="is-square">
          <img class="is-rounded" :src="post.uri">
        </figure>
      </div>
      <div class="column is-6-desktop is-12-mobile" style="padding-top: 30px;">
        <div class="media nickname has-text-centered " style="">
          <div class="media-content">
            <div class="content" style="margin-bottom:0px;">
              <h2 class="title is-2"><strong>Lucas Spirandeli</strong></h2>
              <h3 class="subtitle is-5"></h3>
            </div>
            <button class="button is-link">Editar seu perfil</button>
          </div>
        </div>
      </div>
      <div class="column is-4-desktop is-12-mobile is-hidden-mobile">

        <figure class="is-square">
          <img class="is-rounded" :src="post.uri">
        </figure>
      </div>
    </div>
  </section>
  <nav class="level is-mobile">
    <div class="level-item has-text-centered has-text-primary">
      <font-awesome-icon icon="check" style="font-size: 25px; color: #3273dc;"></font-awesome-icon>
      <h3 style="margin:0px; text-align:center;" class="">1092</h3>
      <h3 style="margin:0px; font-size:14px; text-align:center; font-weight: 300;" class="">PONTOS</h3>
    </div>
    <div class="level-item has-text-centered has-text-primary">
      <font-awesome-icon icon="graduation-cap" style="font-size: 25px; color: #3273dc;"></font-awesome-icon>
      <h3 style="margin:0px; text-align:center;" class="">03</h3>
      <h3 style="margin:0px; font-size:14px; text-align:center; font-weight: 300;" class="">CURSOS</h3>
    </div>
    <div class="level-item has-text-centered has-text-primary">
      <font-awesome-icon icon="comment-dots" style="font-size: 25px; color: #3273dc;"></font-awesome-icon>
      <h3 style="margin:0px; text-align:center;" class="">12</h3>
      <h3 style="margin:0px; font-size:14px; text-align:center; font-weight: 300;" class="">POSTS</h3>
    </div>
    <!-- <div class="level-item has-text-centered">
      <div>
        <p class="heading">Completado por</p>
        <p class="title">789</p>
      </div>
    </div> -->
  </nav>
<div class="is-centered section is-offset-one-fifth is-three-fifths column">
  <forum-post></forum-post>
  <forum-post></forum-post>
  <forum-post></forum-post>
</div>
</div>

</template>

<script>

import ForumPost from './Community/PostItem'
export default {
  components: {
    ForumPost
  },
  data(){
    return{

    post: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      nickname: '@nickname',
      data: 'a 3 horas atrás',
      uri: '/static/perfil.png',
    },
    tags:["Revit","Autocad", "Photoshop", "Illustrator", "Lumion", "V-Ray", "SketchUp"],
    filtro: '',
    foto:{
      url: 'https://spirandeli.com.br/wp-content/uploads/2019/03/forum-01.png',
    }
    //tags:[ {titulo: "Revit"},{titulo: "Autocad"}, {titulo: "Photoshop"}, {titulo: "Illustrator"}, {titulo: "Lumion"}, {titulo: "V-Ray"}, {titulo: "SketchUp"}]

  }
  },

  computed: {

    postsComFiltro() {

      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.post.filter(posts => exp.test(post.content));
      } else {
        return this.post;
      }

    }
  },



}
</script>

<style>
div#firstSection {
    background-color: #fefefe;
    margin: 20px;
    border-radius: 10px;
    padding:20px;
        width: 35%;
}
div#postnickname {
    padding-top: 30px;
}
.media {
    -ms-flex-align: start;
    align-items: flex-start;
    display: -ms-flexbox;
    display: flex;
    text-align: left;
}
figure.nickname.image {
    width: 40px;
    height: auto;
    margin: 0 auto;
}
.media.nickname .media-content {
    padding-left: 15px;
    padding-top: 5px;
}
.media-content {
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    text-align: left;
}



.is-vertical-center {
  display: flex;
  align-items: center;
}


.centerText {
  line-height: 1.5;
  display: inline-block;
  vertical-align: middle;
}
.centerImage{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}

.listDetails{
  padding:3px;
  text-align: left;


}

a.listDetails {
    border-radius: 0px;

    border-color: transparent;
    border-width: 0px;
}

aside.menu {
    padding-top: 3rem;
}
aside.menu .menu-list {
    line-height: 1.5;
}
button.is-primary.is-alt {
    background: #00c6ff;
    background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
    background: linear-gradient(to bottom, #0072ff, #00c6ff);
    font-weight: 700;
    font-size: 14px;
    height: 3rem;
    line-height: 2.8;
}
#search{

  background-color:  rgba(255, 255, 255, 0.1);
  border-color: transparent;
}
.menu-list li {
    padding: 0px;
}

article.post {
    margin: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #E6EAEE;
}

.hero.is-info {
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://unsplash.it/1200/900?random) no-repeat center center fixed;

    background-size: cover;
}

</style>
