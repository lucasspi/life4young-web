<template>
  <div class="box">
    <p style="text-align:center">
      Exercite seu conhecimento trocando experiências em nossa comunidade
    </p>
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="http://placehold.it/128x128">
        </p>
      </figure>
      <div class="media-content">
        <p class="control">
          <vue-emoji width="100%" @input="onUpdateCommentInputField" :value="form.comment"></vue-emoji>
        </p>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <a class="button is-info">Enviar comentário</a>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <label class="checkbox">
                <input type="checkbox"> Apertar enter para enviar
              </label>
            </div>
          </div>
        </nav>
      </div>
    </article>
    <hr>
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="http://placehold.it/128x128">
        </p>
      </figure>
      <div class="media-content">
        <p><strong>Mauricio Yochizumi</strong> <small> · 3 hrs</small></p>
        <div class="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
          </p>
        </div>
        <p><small><a>Gostei</a> · <a>Responder</a></small></p>
      </div>
    </article>
    <div class="spacer"></div>
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="http://placehold.it/128x128">
        </p>
      </figure>
      <div class="media-content has-text-grey">
        <p class="has-text-grey"><strong>Bruno Campos</strong> <small> · 3 hrs</small></p>
        <div class="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
          </p>
        </div>
        <p><small><a>Aprovar</a> · <a>Reprovar</a></small></p>
      </div>
    </article>
    <div class="spacer"></div>
  </div>
</template>

<script>
  import VueEmoji from 'emoji-vue'
  import Form from '@/helpers/form'

	export default {

	  name: 'Comments',

	  components: {
	    VueEmoji
    },


    beforeRouteEnter(to, from, next) {
      next(vm => vm.setData(null, {}));
    },
    beforeRouteLeave(from, to, next) {
      next();
    },

	  data () {
	    return {
	      form: new Form({
          comment: ''
        })
	    }
    },

    methods: {
      setData(err, data) {
        if (err) {
          this.error = err.response.body.message;
        } else {
          for (let field in data) {
            this[field] = data[field];
          }
        }
      },
      onUpdateCommentInputField(event) {
        this.form.comment = event.data;
      }
    }
	}
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '~bulma/sass/elements/form';
  .emoji-vue-textarea {
    @extend .textarea;
  }
</style>
