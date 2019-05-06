<template>
  <div>
    <section class="container is-12-desktop is-vcentered" style="margin-top:2%; margin-bottom:8%;">
        <div class="media-content columns is-vcentered ">
          <div class="field column is-10-desktop is-11-mobile" style="margin:0px;">
            <p class="control">
              <textarea class="input" placeholder="Adicione um comentário"></textarea>
            </p>
          </div>
          <div class="field column is-2-desktop is-12-mobile" style="padding-top: 0px;">
            <p class="control">
              <button class="button buttonComment">Comentar</button>
            </p>
          </div>
        </div>
    </section>

    <section class="container is-12 is-vcentered" style="margin-bottom:35px; padding-left:10px; padding-right:10px;">
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img style="border-radius: 50%;" src="https://bulma.io/images/placeholders/128x128.png">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
              <br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <p style="padding-left:5px; padding-right:3px; color: black;">10</p>
                <font-awesome-icon icon="thumbs-up" style="color: #0691E6; font-size: 16px;"></font-awesome-icon>
              </a>
              <a class="level-item">
                <p style="padding-left:5px; padding-right:5px; color: black;">Responder</p>
                <font-awesome-icon icon="reply" style="color: #0691E6; font-size: 16px;"></font-awesome-icon>
              </a>
              <a class="level-item">
                <p style="padding-left:5px; padding-right:5px; color: black;">Editar</p>
                <font-awesome-icon icon="ellipsis-h" style="color: #0691E6; font-size: 16px;"></font-awesome-icon>
              </a>
            </div>
          </nav>
        </div>

      </article>
    </section>
    <section class="container is-12 is-vcentered" style="margin-bottom:35px; padding-left:10px; padding-right:10px;">
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img style="border-radius: 50%;" src="https://bulma.io/images/placeholders/128x128.png">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
              <br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <p style="padding-left:5px; padding-right:3px; color: black;">10</p>
                <font-awesome-icon icon="thumbs-up" style="color: #0691E6; font-size: 16px;"></font-awesome-icon>
              </a>
              <a class="level-item">
                <p style="padding-left:5px; padding-right:5px; color: black;">Responder</p>
                <font-awesome-icon icon="reply" style="color: #0691E6; font-size: 16px;"></font-awesome-icon>
              </a>
              <a class="level-item">
                <p style="padding-left:5px; padding-right:5px; color: black;">Editar</p>
                <font-awesome-icon icon="ellipsis-h" style="color: #0691E6; font-size: 16px;"></font-awesome-icon>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {

  name: 'lesson-comments',
  props: ['active'],
  components: {

  },

}
</script>

<style>
.buttonComment{
  float: right;
  background-color:  #0691E6;
  color: white;
  font-weight:600;
  border-color:transparent;

}
.article4NewComment{
  margin:auto;
  width:100%;
}
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .article4NewComment{
    margin: auto;
    width: 100%;
  }
  .buttonComment{
    float: left;
    margin-left:10px;
  }
  textArea{
    margin-left: 10px;
    margin-right: 10px;
  }
 }

</style>
