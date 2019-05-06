<template>
  <div class="profile-page">
    <hero-section :not-waves="true" set-classes="is-bold">
      <div class="container">
        <h1 class="title">
          Meu Perfil Público
        </h1>
        <router-link class="button is-light is-medium" to="/profile">Voltar para meu perfil</router-link>
      </div>
    </hero-section>

    <div class="container">
      <div class="columns is-multiline is-centered">
        <div class="column is-10">
          <div class="box profile">
            <figure class="profile-img image is-128x128">
              <div class="overlay-edit" @click="editAvatarPicture()">
                <font-awesome-icon v-if="user_has_avatar" icon="trash"></font-awesome-icon>
                <font-awesome-icon v-else icon="upload"></font-awesome-icon>
              </div>
              <img v-if="user_has_avatar" :src="$auth.user().avatar.image_url" alt="" class="is-rounded">
              <img v-else class="is-rounded" src="/static/perfil.png">
            </figure>
            <h1 class="title has-text-centered" v-if="$auth.user().nickname">{{$auth.user().nickname}}</h1>
            <h1 class="title has-text-centered" v-else>{{$auth.user().name}}</h1>
            <form action="" @submit.prevent="onSubmitUpdateMe" method="post">
              <form-control :form="form" name="nickname" label="Apelido (apenas letras e números, sem espaços)" control-class="has-icons-left">
                <input type="text" placeholder="Seu nickname" name="nickname" v-model="form.nickname" class="input">
                <div class="icon is-small is-left">
                  <font-awesome-icon icon="at"></font-awesome-icon>
                </div>
              </form-control>
              <form-control :form="form" name="public_email" label="E-mail público" control-class="has-icons-left">
                <input class="input" type="public_email" :placeholder="$t('profile.email')" name="public_email" v-model="form.public_email">
                <div class="icon is-small is-left">
                  <vue-material-icon name="mail"></vue-material-icon>
                </div>
              </form-control>
              <div class="field">
                <label for="" class="label">Telefone público</label>
                <div class="control">
                  <vue-tel-input v-model="form.public_phone" :placeholder="$t('identification-form.fields.phone_number')" @onInput="onPhoneInput" autocomplete="tel-national" :preferredCountries="['br']"></vue-tel-input>
                </div>
                <p class="help is-danger" v-if="form.errors.has('public_phone')" v-text="form.errors.get('public_phone')"></p>
              </div>
              <!--
              'instagram_url', 'facebook_url',
             'linkedin_url', 'twitter_url'
             -->
              <form-control :form="form" name="instagram_username" label="Instagram" help-info="Apenas o nome do usuário (sem @)" control-class="has-icons-left">
                <input class="input" type="instagram_username" placeholder="seu.perfil" name="instagram_username" v-model="form.instagram_username">
                <div class="icon is-small is-left">
                  <font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon>
                </div>
              </form-control>
              <form-control :form="form" name="twitter_username" label="Twitter" help-info="Apenas o nome do usuário (sem @)" control-class="has-icons-left">
                <input class="input" type="twitter_username" placeholder="seu.perfil" name="twitter_username" v-model="form.twitter_username">
                <div class="icon is-small is-left">
                  <font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon>
                </div>
              </form-control>
              <form-control :form="form" name="facebook_url" label="Facebook" control-class="has-icons-left">
                <input class="input" type="facebook_url" placeholder="https://www.facebook.com/SEU.PERFIL" name="facebook_url" v-model="form.facebook_url">
                <div class="icon is-small is-left">
                  <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
                </div>
              </form-control>
              <form-control :form="form" name="linkedin_url" label="LinkedIn" control-class="has-icons-left">
                <input class="input" type="linkedin_url" placeholder="https://www.linkedin.com/in/SEU.PERFIL/" name="linkedin_url" v-model="form.linkedin_url">
                <div class="icon is-small is-left">
                  <font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
                </div>
              </form-control>
              <form-control :form="form" name="biography" label="Biografia">
                <textarea placeholder="Digite uma breve apresentação..." class="textarea" name="biography" v-model="form.biography"></textarea>
              </form-control>
              <div class="control has-text-centered">
                <button type="submit" class="button is-primary" :class="{'is-loading': form.sendingData}">Atualizar meu perfil público</button>
              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
    <div class="modal change-avatar" style="z-index: 999999999" :class="{'is-active': modalCropActive}">
      <div class="modal-background"></div>
      <div class="modal-header">
        <h2 class="title">Escolha seu melhor ângulo!</h2>
      </div>
      <div class="modal-content">
        <div class="box">
          <vue-croppie
            ref="croppieRef"
            :enableOrientation="true"
            :mouseWheelZoom="false"
            :viewport="{ width: 200, height: 200, type: 'circle' }"
            :boundary="{ width: 220, height: 220 }"
            :size="{ width: 220, height: 220 }"
            :enableResize="false">
          </vue-croppie>
          <div class="has-text-centered">
            <p v-if="modalCropSendingImage">
              <progress class="progress" max="100" :value="modalCropUploadProgress">{{modalCropUploadProgress}}%</progress>
              <br /><br />
            </p>
            <button type="button" class="button is-success" :class="{'is-loading': modalCropSendingImage}" @click="onClickButtonSaveCrop()" >Salvar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueCroppie from 'vue-croppie';
  import HeroSection from './HeroSection.vue'
  import FormControl from './Form/FormControl.vue'
  import Form from '@/helpers/form'
  import api from '../api'
  Vue.use(VueCroppie);

  export default {

    name: 'ProfilePublicSettings',

    components: {
      HeroSection,
      FormControl,
    },

    beforeRouteEnter (to, from, next) {
      next(vm => vm.startComponent())
    },
    beforeRouteLeave (from, to, next) {
      next()
      this.startComponent()
    },

    data () {
      return {
        form: new Form({
          nickname: this.$auth.user().nickname,
          public_email: this.$auth.user().public_email,
          public_phone: this.$auth.user().public_phone,
          biography: this.$auth.user().biography,
          instagram_username: this.$auth.user().instagram_username,
          facebook_url: this.$auth.user().facebook_url,
          linkedin_url: this.$auth.user().linkedin_url,
          twitter_username: this.$auth.user().twitter_username
        }),
        modalCropActive: false,
        modalCropSendingImage: false,
        modalCropUploadProgress: 0,
        phone_input: '',
        is_phone_input_valid: false
      }
    },

    computed: {
      user_has_avatar() {
        return this.$auth.user() && this.$auth.user().avatar && this.$auth.user().avatar.image_url;
      }
    },

    methods: {
      startComponent () {

      },
      onPhoneInput ({ number, isValid, country }) {
        console.log(number, isValid, country)
        if (isValid) {
          let numberFragments = number.split(' ');
          if (Array.isArray(numberFragments) && numberFragments.length > 0) {
            let smallNumbersCount = numberFragments.filter((num, idx, arr) => num.length <= 3);
            // Check if there is a local code with the country code
            if (smallNumbersCount.length >= 2) {
              this.is_phone_input_valid = isValid
              console.log(number, isValid, country)
              return;
            }
          }
        }
        console.log(number, false, country)
        this.is_phone_input_valid = false
      },
      async removeAvatarPicture() {
        const result = await this.$swal({
          title: 'Tem certeza?',
          text: 'Você tem certeza que deseja apagar seu avatar atual?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, deletar!',
          cancelButtonText: 'Não',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.$store.dispatch('users/deleteAvatar')
              .then(() => new Promise((resolve, reject) => {
                this.$auth.fetch({
                  success: () => resolve(),
                  error: () => reject()
                })
              }))
              .then(() => true)
          }
        });
        if (result.value) {
          this.$swal('Pronto!', 'Seu avatar foi deletado com sucesso :)', 'success')
        }
      },
      async editAvatarPicture() {
        if (this.user_has_avatar) {
          await this.removeAvatarPicture();
          return true;
        }
        const {value: formValues} = await this.$swal.fire({
          title: 'Subir um novo avatar',
          html: '<div class="field"><div class="file is-centered is-fullwidth"><label class="file-label"><input id="avatar_img" class="file-input" type="file"><span class="file-cta"><span class="file-label">Escolha sua foto de avatar</span></span><span class="file-name" id="avatar_img_filename">Escolha seu novo avatar...</span></label></div></div>',
          focusConfirm: false,
          confirmButtonText: 'Continuar',
          onOpen: (mDom) => {
            document.getElementById('avatar_img').onchange = () => {
              const files = document.getElementById('avatar_img').files;
              if (files) {
                const file = files[0];
                document.getElementById('avatar_img_filename').innerText = file.name;
              }
            }
          },
          preConfirm: () => {
            return new Promise((resolve, reject) => {
              const files = document.getElementById('avatar_img').files;
              const reader = new FileReader();
              reader.readAsDataURL(files[0]);
              reader.onload = () => {
                resolve();
                this.$refs.croppieRef.bind({url: reader.result})
              };
              reader.onerror = (err) => {reject(); console.log('Error: ', err)};
            })
          }
        });

        if (formValues) {
          this.modalCropActive = true;
        }
      },
      async onClickButtonSaveCrop() {
        this.modalCropActive = true;
        this.modalCropSendingImage = true;

        const imgBlob = await this.$refs.croppieRef.result({type: 'blob', size: 'original', quality: 1});

        var data = new FormData();
        data.append('avatar', imgBlob, 'the_avatar.png');

        await api.users.uploadAvatar(data, {
          onUploadProgress: (progressEvent) => {
            this.modalCropUploadProgress = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          }
        });

        await new Promise((resolve, reject) => {
          this.$auth.fetch({
            success: () => resolve(),
            error: () => reject()
          })
        });

        this.modalCropActive = false;
        this.modalCropSendingImage = false;
        this.$swal({type: 'success', title: 'Pronto!'})
      },
      onSubmitUpdateMe () {
        this.$swal({
          type: 'question',
          title: 'Tem certeza?',
          html: '<p class="subtitle"><strong>Deseja atualizar os seus dados?</strong></p>',
          showCancelButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não',
          preConfirm: () => {
            return this.form.put('auth/me')
          }
        }).then((result) => {
          if (result.value) {
            this.$swal({
              type: 'success',
              title: 'Pronto!',
              html: 'Seus dados foram atualizados com sucesso!'
            }).then(() => {
              window.location.reload();
            })
          }
        }, (err) => {
          if (err && (err.message || err.hasOwnProperty('message'))) {
            this.$swal({type: 'error', title: 'Erro', html: err.message})
          }
        })
      }
    }
  }
</script>

<style lang="scss">


  .modal-card .content h1 {
    padding: 40px 10px 10px;
    border-bottom: 1px solid #dadada
  }
  .modal.change-avatar .modal-content {
    height: 400px;
    position: relative;
    .box {
      min-height: 100%;
    }
  }
  .box.profile {
    .image {
      margin: -84px auto 30px auto;
      z-index: 100;
      position: relative;
      img { box-shadow: 0px 3px 12px -3px rgba(14, 14, 14, 0.4); }
      &.profile-img {
        cursor: pointer;
        .overlay-edit {
          opacity: 0;
          transition: 0.3s all;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0,0,0,0.5);
          border-radius: 100%;
          color: #FFF;
          font-size: 30px;
        }
        &:hover {
          .overlay-edit {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
