<template>
  <div>
    <hero-section not-waves="true" set-classes="is-bold">
      <div class="container">
        <h1 class="title">
          <span>Compartilhe seu amor por aprender</span>
          <span class="icon has-text-danger is-size-4"><font-awesome-icon icon="heart"></font-awesome-icon></span>
        </h1>
        <h2 class="subtitle">
          <span class="icon has-text-danger">
            ⛓
          </span>
          <span>Alimente essa <strong>corrente do bem!</strong></span>
        </h2>
      </div>
    </hero-section>
    <rules @agreed="onRulesAgreed" v-if="showing_rules"></rules>
    <div v-else class="container">
      <p>&nbsp;</p>
      <div class="columns is-centered is-multiline">
        <div class="column is-8">
          <div class="box">
            <div v-if="!completed_all_achievements" class="columns is-multiline ">
              <div class="column is-6">
                <div v-if="current_progress">
                  <strong class="is-size-5">Desafio: </strong>
                  <div class="is-size-6" v-html="current_progress.achievement.description"></div>
                </div>
              </div>
              <div class="column is-6">
                <div v-if="current_progress && !current_progress.is_timeout_expired">
                  <p>
                    <strong>Você tem:</strong>
                  </p>
                  <div class="box" style="margin-bottom: 10px;">
                    <countdown v-if="current_progress && current_progress.achievement_available_until && current_progress.achievement_available_until.date" @ended="onEndCountdown()" :until="current_progress.achievement_available_until.date"></countdown>
                  </div>
                  <p class="is-size-7 has-text-centered">
                    Para completar este desafio
                  </p>
                </div>
                <div v-else>
                  <p><strong>Ops! Você perdeu o <i>timing</i>.</strong> Infelizmente tivemos que repassar sua vaga para outra pessoa.</p>
                  <div v-if="current_progress && current_progress.achievement_penalty_until" class="box" style="margin-bottom: 10px;">
                    <p>Para retornar à corrente do bem aguarde a liberação de uma próxima vaga:</p>
                    <countdown v-if="current_progress.achievement_penalty_until.date" @ended="onEndCountdown()"  :until="current_progress.achievement_penalty_until.date"></countdown>
                  </div>
                  <div class="box has-text-centered" v-else>
                    <p>Aguarde os próximos desafios.</p>
                  </div>
                </div>
              </div>
              <div v-if="current_progress" class="column is-6">
                <hr />
                <span class="is-size-4 has-text-primary"><font-awesome-icon icon="trophy"></font-awesome-icon></span>
                <strong v-if="metadata_html(current_progress.achievement, 'rewards')" class="is-size-5">Recompensa:</strong>
                <div v-if="metadata_html(current_progress.achievement, 'rewards')" class="is-size-6" v-html="metadata_html(current_progress.achievement, 'rewards').value"></div>
              </div>
              <div v-if="metadata_html(current_progress.achievement, 'bonus_rewards')" class="column is-6">
                <hr>
                <span class="is-size-4 has-text-primary"><font-awesome-icon icon="gift"></font-awesome-icon></span>
                <strong class="is-size-5">Bônus:</strong>
                <div class="is-size-6" v-html="metadata_html(current_progress.achievement, 'bonus_rewards').value"></div>
              </div>
            </div>

            <div v-if="completed_all_achievements" class="columns is-centered">
              <div class="column is-10 has-text-centered">
                <p class="is-size-1 has-text-warning"><font-awesome-icon icon="trophy"></font-awesome-icon></p>
                <p class="is-size-2"><strong>Parabéns!</strong></p>
                <p class="is-size-3">Você concluiu todos os desafios.</p>
                <p>&nbsp;</p>
                <p class="is-size-3">Aguarde os próximos...</p>
                <router-link to="/dashboard" class="button is-success">Ir para meus cursos</router-link>
              </div>

            </div>
          </div>

          <form v-if="!is_timeout_expired && !completed_all_achievements" action="" method="post" @submit.prevent="onSubmitForm">
            <div :class="{'modal all-white is-active': auto_start}">
              <div v-if="auto_start" class="modal-background"></div>
              <div :class="{'modal-content': auto_start}">
                <div class="box" :class="{'has-text-centered': auto_start}" :style="auto_start ? '' : 'background-color: #EFFFF5;'">
                  <h3 class="subtitle" :class="{'is-size-1 has-text-centered': auto_start}">
                    <span v-if="auto_start" class="icon has-text-danger is-size-4"><font-awesome-icon icon="heart"></font-awesome-icon><Br /></span>
                    <strong>Indicar amigos</strong>
                  </h3>

                  <p>Para indicar amigos é fácil, <strong>é só compartilhar com eles o seu link de indicação.</strong> Assim que eles realizarem o cadastro, os e-mails aparecerão no <strong>Status do Desafio.</strong></p>
                  <p>&nbsp;</p>
                  <p>Clique no campo abaixo para copiar o link, depois é só enviar esse link para os seus amigos:</p>
                  <p>&nbsp;</p>
                  <div class="control has-icons-right">
                    <input type="text" class="input is-large" style="cursor: pointer" @click="copylinkToClipboard(`https://${window_location_hostname}/chain-of-knowledge?u=${base64.encode($auth.user().id)}`)" @focus="$event.target.select()" :value="`https://${window_location_hostname}/chain-of-knowledge?u=${base64.encode($auth.user().id)}`">
                    <span class="icon is-large is-right">
                      <font-awesome-icon icon="clone"></font-awesome-icon>
                    </span>
                  </div>
                  <p>&nbsp;</p>
                  <div class="columns" :class="{'is-centered': auto_start}">
                    <div class="column is-4 has-text-centered">
                      <a :href="whatsapp_sharing_link" target="_blank" class="button is-success has-icons-left" :class="{'is-small': auto_start}" >
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'whatsapp']"></font-awesome-icon>
                        </span>
                        <span>Compartilhar no WhatsApp</span>
                      </a>
                    </div>
                    <div class="column is-4 has-text-centered" v-if="!auto_start">
                      <a :href="facebook_sharing_link" target="_blank" class="button is-primary has-icons-left" :class="{'is-small': auto_start}">
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
                        </span>
                        <span>Compartilhar no Facebook</span>
                      </a>
                    </div>
                    <div class="column is-4 has-text-centered" v-if="!auto_start">
                      <a :href="linkedin_sharing_link" target="_blank" class="button is-primary has-icons-left" :class="{'is-small': auto_start}">
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
                        </span>
                        <span>Compartilhar no LinkedIn</span>
                      </a>
                    </div>
                  </div>
                  <div class="control" v-if="auto_start">
                    <a href="javascript:void(0);" @click="auto_start = false" class="button is-rounded is-danger is-fullwidth">
                      <span>Acompanhar Status do Desafio</span>
                    </a>
                  </div>
                </div>
                <p>&nbsp;</p>
              </div>
            </div>
          </form>

          <div v-if="!is_timeout_expired && !completed_all_achievements" class="box">
            <nav class="level">
              <div class="level-item level-left">
                <h3 class="subtitle"><strong>Status do desafio</strong></h3>
              </div>
            </nav>
            <p>Veja abaixo as indicações já realizadas. <strong>Lista atualizada automaticamente a cada 15 segundos.</strong></p>
            <table class="table is-fullwidth" :class="{'is-loading': is_loading_data}">
              <thead>
                <tr>
                  <th>E-mail</th>
                  <th class="has-text-centered">Já cadastrou?</th>
                  <th class="has-text-centered" v-if="current_progress_has_order_id_not_null">Já comprou?</th>
                </tr>
              </thead>

              <tbody>
              <tr v-if="invitations.length > 0" v-for="invitation in invitations">
                <th>{{invitation.email}}</th>
                <th class="has-text-centered" :class="{'has-text-danger': !invitation.is_signed_up, 'has-text-success': invitation.is_signed_up}">
                  <font-awesome-icon :icon="invitation.is_signed_up ? 'check' : 'times'"></font-awesome-icon>
                </th>
                <th class="has-text-centered" v-if="current_progress_has_order_id_not_null" :class="{'has-text-danger': !invitation.has_order_approved, 'has-text-success': invitation.has_order_approved}">
                  <font-awesome-icon :icon="invitation.has_order_approved ? 'check' : 'times'"></font-awesome-icon>
                </th>
              </tr>
              <tr v-if="invitations.length == 0">
                <th colspan="3">
                  <div class="content">
                    <p class="has-text-centered">
                      Aguardando cadastros dos seus convites.
                    </p>
                  </div>
                </th>
              </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div class="column is-4">
          <div class="box">
            <div class="timeline">
              <header class="timeline-header">
                <span class="tag is-medium is-dark">Início</span>
              </header>
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <p>Ler e entender as regras da Corrente do bem</p>
                </div>
              </div>
              <div v-for="achievement in game.achievements" :key="achievement.id">
                <header class="timeline-header">
                  <a href="javascript:void(0);" @click="toggleTimelineContent(achievement.id)" class="tag" :class="achievementClassMap(achievement.slug)">
                    <span class="icon">
                      <font-awesome-icon v-if="is_closed.indexOf(achievement.id) !== -1" icon="plus"></font-awesome-icon>
                      <font-awesome-icon v-if="is_closed.indexOf(achievement.id) === -1" icon="minus"></font-awesome-icon>
                    </span>
                    <span v-html="achievement.name"></span>
                  </a>
                </header>

                <slide-up-down :active="is_closed.indexOf(achievement.id) === -1">
                  <div class="timeline-item"   :class="achievementClassMap(achievement.slug)">
                    <div class="timeline-marker"  :class="achievementClassMap(achievement.slug)"></div>
                    <div class="timeline-content">
                      <p><strong>Desafio:</strong></p>
                      <p v-html="achievement.description"></p>
                    </div>
                  </div>
                  <div class="timeline-item" :class="achievementClassMap(achievement.slug)">
                    <div class="timeline-marker" :class="achievementClassMap(achievement.slug)"></div>
                    <div class="timeline-content">
                      <p v-if="metadata(achievement, 'rewards')">
                        <strong>Recompensa:</strong>
                      </p>
                      <p v-if="metadata(achievement, 'rewards')" v-html="metadata(achievement, 'rewards').value"></p>
                    </div>
                  </div>
                  <div v-if="metadata_html(achievement, 'bonus_rewards') && metadata_html(achievement, 'bonus_rewards').value" class="timeline-item" :class="achievementClassMap(achievement.slug)">
                    <div class="timeline-marker" :class="achievementClassMap(achievement.slug)"></div>
                    <div class="timeline-content">
                      <p>
                        <strong>Bônus:</strong>
                      </p>
                      <p v-html="metadata_html(achievement, 'bonus_rewards').value"></p>
                    </div>
                  </div>

                  <div class="timeline-item" :class="achievementClassMap(achievement.slug)" v-if="progress_by_slug(achievement.slug) && !progress_by_slug(achievement.slug).rewarded_at">
                    <div class="timeline-marker" :class="achievementClassMap(achievement.slug)"></div>
                    <div class="timeline-content">
                      <p>&nbsp;</p>
                      <div v-if="progress_by_slug(achievement.slug) && !progress_by_slug(achievement.slug).is_timeout_expired">
                        <p>
                          <strong>Você tem:</strong>
                        </p>
                        <div class="box" style="margin-bottom: 10px;">
                          <countdown v-if="progress_by_slug(achievement.slug) && progress_by_slug(achievement.slug).achievement_available_until && progress_by_slug(achievement.slug).achievement_available_until.date" @ended="onEndCountdown()" :until="progress_by_slug(achievement.slug).achievement_available_until.date"></countdown>
                        </div>
                        <p class="is-size-7 has-text-centered">
                          Para completar este desafio
                        </p>
                      </div>
                      <div v-else>
                        <p>Ops! Você perdeu o <i>timing</i>. Infelizmente tivemos que repassar sua vaga para outra pessoa.</p>
                        <div v-if="progress_by_slug(achievement.slug) && progress_by_slug(achievement.slug).achievement_penalty_until" class="box" style="margin-bottom: 10px;">
                          <p>Para retornar à corrente do bem aguarde a liberação de uma próxima vaga:</p>
                          <countdown v-if="progress_by_slug(achievement.slug).achievement_penalty_until.date" @ended="onEndCountdown()"  :until="progress_by_slug(achievement.slug).achievement_penalty_until.date"></countdown>
                        </div>
                        <div class="box" v-else>
                          Aguarde os próximos desafios.
                        </div>
                      </div>
                    </div>
                  </div>
                </slide-up-down>

                <div class="timeline-item" :class="achievementClassMap(achievement.slug)" v-if="!progress_by_slug(achievement.slug)">
                  <div class="timeline-marker" :class="achievementClassMap(achievement.slug)"></div>
                  <div class="timeline-content">
                    <div>
                      <span class="has-text-grey-light"><font-awesome-icon icon="clock"></font-awesome-icon></span>
                      <span>Quase lá...</span>
                    </div>
                  </div>
                </div>

                <div class="timeline-item" :class="achievementClassMap(achievement.slug)" v-if="progress_by_slug(achievement.slug) && progress_by_slug(achievement.slug).rewarded_at">
                  <div class="timeline-marker" :class="achievementClassMap(achievement.slug)"></div>
                  <div class="timeline-content">
                    <div>
                      <span class="has-text-success"><font-awesome-icon icon="check"></font-awesome-icon></span>
                      <span>Feito</span>
                    </div>
                  </div>
                </div>

                <div class="timeline-item" :class="achievementClassMap(achievement.slug)" v-if="progress_by_slug(achievement.slug) && !progress_by_slug(achievement.slug).rewarded_at && !progress_by_slug(achievement.slug).is_timeout_expired">
                  <div class="timeline-marker" :class="achievementClassMap(achievement.slug)"></div>
                  <div class="timeline-content">
                    <div>
                      <span class="has-text-warning"><font-awesome-icon icon="arrow-right"></font-awesome-icon></span>
                      <span>Você está aqui</span>
                    </div>
                  </div>
                </div>

                <div class="timeline-item" :class="achievementClassMap(achievement.slug)" v-if="progress_by_slug(achievement.slug) && !progress_by_slug(achievement.slug).rewarded_at && progress_by_slug(achievement.slug).is_timeout_expired">
                  <div class="timeline-marker" :class="achievementClassMap(achievement.slug)"></div>
                  <div class="timeline-content">
                    <div>
                      <span class="has-text-danger"><font-awesome-icon icon="hand-paper"></font-awesome-icon></span>
                      <span>Tempo esgotado :(</span>
                    </div>
                  </div>
                </div>
              </div>
              <header class="timeline-header">
                <span class="tag is-medium is-primary"><font-awesome-icon icon="trophy"></font-awesome-icon></span>
              </header>
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <p>
                    <span>Você fez sua parte</span>
                    <span class="icon has-text-danger">
                      <font-awesome-icon icon="heart"></font-awesome-icon>
                    </span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>



      <p>&nbsp;</p>
    </div>
  </div>
</template>

<script>
import VueEmoji from 'emoji-vue'
import Form from '@/helpers/form'
import HeroSection from './HeroSection.vue'
import {mapState, mapGetters} from 'vuex'
import store from '@/store';

import Rules from './Invites/Rules.vue'
import Vue from 'vue';
import api from '../api'
import Countdown from './ProductCheckoutPage/Countdown.vue'
import {Base64} from 'js-base64';
import copy from '../helpers/clipboard';

var updateProgressInterval = null;

export default {

  name: 'Invites',

  components: {
    VueEmoji,
    HeroSection,
    Rules,
    Countdown,

  },

  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch('leads/loadInvitations'),
      store.dispatch('layout/fetchContent', api.layout.contents.types.chainOfKnowledgeRules),
      store.dispatch('gamefication/fetchGame', api.gamefication.games.chainOfKnowledge),
      store.dispatch('gamefication/fetchProgress', api.gamefication.games.chainOfKnowledge),
    ]).then(
      () => next(vm => vm.startComponent(to.query.auto === 'start'))
    );
  },
  beforeRouteLeave (from, to, next) {
    if (updateProgressInterval) {
      window.clearInterval(updateProgressInterval);
    }
    next()
  },

  computed: {
    ...mapState('leads', ['is_inviting_friends', 'is_loading_invitations', 'invitations']),
    ...mapState('gamefication', ['game', 'loading_game', 'progress', 'loading_progress', 'starting_game']),
    ...mapGetters('gamefication', ['getAchievementProgressBySlug']),
    ...mapGetters('metadata', {metadata: 'getMetadata', metadata_html: 'getMetadataHtml'}),
    progress_by_slug() {
      return (slug) => {
        if (!Array.isArray(this.progress)) return null;
        let progressIndex = this.progress.findIndex((i) => i.achievement.slug === slug);
        return progressIndex !== -1 ? this.progress[progressIndex] : null;
      }
    },
    completed_all_achievements() {
      return this.progress && this.progress.length > 0 && this.progress.filter((p) => !p.rewarded_at).length == 0;
    },
    current_progress() {
      return this.progress && this.progress.length > 0 ? this.progress[this.progress.length - 1] : null;
    },
    current_progress_has_order_id_not_null() {
      if ( this.current_progress && this.current_progress.achievement) {
        const conventionalFilters = this.current_progress.achievement.filters &&
          this.current_progress.achievement.filters.hasOwnProperty('order_id') &&
          Array.isArray(this.current_progress.achievement.filters.order_id) &&
          this.current_progress.achievement.filters.order_id.indexOf('NOT NULL') !== -1;
        const bonusFilters = this.current_progress.achievement.bonus_reward_filters &&
          this.current_progress.achievement.bonus_reward_filters.hasOwnProperty('order_id') &&
          Array.isArray(this.current_progress.achievement.bonus_reward_filters.order_id) &&
          this.current_progress.achievement.bonus_reward_filters.order_id.indexOf('NOT NULL') !== -1;
        return conventionalFilters || bonusFilters;
      }
      return false;
    },
    passo_1 () {
      return this.getAchievementProgressBySlug('passo-1')
    },
    passo_2 () {
      return this.getAchievementProgressBySlug('passo-2')
    },
    passo_3 () {
      return this.getAchievementProgressBySlug('passo-3')
    },
    is_loading_data () {
      return this.is_loading_invitations || this.loading_progress || this.is_inviting_friends;
    },
    is_timeout_expired () {
      return (this.passo_1 && this.passo_1.is_timeout_expired)
        || (this.passo_2 && this.passo_2.is_timeout_expired)
        || (this.passo_3 && this.passo_3.is_timeout_expired);
    },
    achievementClassMap () {
      return (slug) => {
        const progress = this.progress_by_slug(slug);
        return {
          'is-light': !progress,
          'is-success': progress && progress.rewarded_at,
          'is-warning': progress && !progress.rewarded_at && !progress.is_timeout_expired,
          'is-danger': progress && progress.is_timeout_expired
        };
      };
    },
    sharing_link () {
      const encodedUserId = Base64.encode(this.$auth.user().id);
      return `https://${window.location.hostname}/chain-of-knowledge?u=${encodedUserId}`;
    },
    whatsapp_sharing_link () {
      const msgText = `Oi! Me ajuda a concretizar meu sonho? É rapidinho (menos de 30s)!! Você também vai ganhar cursos grátis! Pra participar é só ir em: ${this.sharing_link}\n\n<3`;

      return `https://wa.me/?text=${encodeURIComponent(msgText)}`;
    },
    facebook_sharing_link () {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.sharing_link)}`;
    },
    linkedin_sharing_link() {
      return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(this.sharing_link)}`;
    }
  },

  data () {
    return {
      form: new Form({
        emails: ''
      }),
      steps: null,
      showing_rules: false,
      base64: Base64,
      window_location_hostname: window.location.hostname,
      is_closed: [],
      auto_start: false,
    }
  },

  methods: {
    toggleTimelineContent(achievement) {
      let achievementIndex = this.is_closed.indexOf(achievement);
      if (achievementIndex !== -1) {
        this.is_closed.splice(achievementIndex, 1);
        console.log('[Invites::toggleTimelineContent] is_closed: ', false);
      } else {
        this.is_closed.push(achievement);
        console.log('[Invites::toggleTimelineContent] is_closed: ', true);
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(email);
    },
    async onSubmitForm () {
      let emails = [this.form.emails];
      console.log('[Invites::onSubmitForm] emails: ', emails)
      let invitationPayload = {
        emails,
        extra_infos: {
          from_achievement_id: this.current_progress.achievement_id,
          fields: {
            invited_by_id: this.$auth.user().id,
            invited_by_name: this.$auth.user().name
          }
        }
      }
      try {
        await this.$store.dispatch('leads/inviteUserFriends', invitationPayload)
      } catch (error) {
        this.$swal({
          type: 'error',
          title: 'Erro!',
          html: '<p>Não foi possível indicar seus amigos :(</p>'
        })
        return false
      }

      this.form.reset();

      try {
        await this.$store.dispatch('gamefication/fetchProgress', api.gamefication.games.chainOfKnowledge)
      } catch (error) {
        console.log('[Invites] Error trying to fetch the progress');
      }

      this.$store.dispatch('instantNotification', {
        message: `Indicações registradas! Em instantes seus amigos receberão sua indicação :)`,
        type: 'success'
      });

      window.setTimeout(() => this.loadInvitations(), 1500);
    },
    startComponent(autoStartGame = false) {
      this.auto_start = autoStartGame;
      if (!this.progress || this.progress.length <= 0) {
        this.showing_rules = true;
        if (autoStartGame) {
          this.onRulesAgreed().then(() => {});
        }
      }

      if (this.game && this.game.achievements && this.game.achievements.length > 0) {
        this.game.achievements.forEach((prog) => {
          this.is_closed.push(prog.id)
        });
      }

      updateProgressInterval = window.setInterval(
        () => {
          this.$store.dispatch('gamefication/fetchProgress', api.gamefication.games.chainOfKnowledge)
          this.loadInvitations();
        },
        10000
      );
    },
    loadInvitations() {
      let fromAchievementId = null;
      if (this.current_progress && this.current_progress.achievement && this.current_progress.achievement.filters
        && this.current_progress.achievement.filters.hasOwnProperty('from_achievement_id')
        && Array.isArray(this.current_progress.achievement.filters.from_achievement_id)
        && this.current_progress.achievement.filters.from_achievement_id.indexOf('CURRENT_ACHIEVEMENT_ID') !== -1) {
        fromAchievementId = this.current_progress.achievement.id;
      }

      return this.$store.dispatch('leads/loadInvitations', fromAchievementId);
    },
    onUpdateCommentInputField (event) {
      this.form.comment = event.data
    },
    async onRulesAgreed () {
      try {
        await this.$store.dispatch('gamefication/startGame', api.gamefication.games.chainOfKnowledge)
        await this.$store.dispatch('gamefication/fetchProgress', api.gamefication.games.chainOfKnowledge)
        window.setTimeout(() => this.$auth.fetch(), 2000);
      } catch (e) {}

      this.showing_rules = false;
    },
    async refreshProgressAndInvitations () {
      try {
        await this.$store.dispatch('gamefication/fetchProgress', api.gamefication.games.chainOfKnowledge)
      } catch (error) {
        console.log('[Invites] Error trying to fetch the progress');
      }
      try {
        await this.$store.dispatch('leads/loadInvitations')
      } catch (error) {
        console.log('[Invites] Error trying to fetch the invitations');
      }

      this.$store.dispatch('instantNotification', {
        message: `Lista de convites atualizada com sucesso :)`,
        type: 'success'
      });
    },
    async onEndCountdown() {
      try {
        await this.$store.dispatch('gamefication/fetchProgress', api.gamefication.games.chainOfKnowledge)
      } catch (error) {
        console.log('[Invites] Error trying to fetch the progress');
      }
      try {
        await this.$store.dispatch('leads/loadInvitations')
      } catch (error) {
        console.log('[Invites] Error trying to fetch the invitations');
      }
    },
    copylinkToClipboard(link) {
      window.Clipboard.copy(link);
      this.$store.dispatch('instantNotification', {
        message: `Link copiado! :)`,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import "~bulma-timeline/dist/css/bulma-timeline";
  @import "../assets/mixins";
  #inviteSteps .step-item.is-active .step-marker {
    @include pulse(#0090f7, 10px, 'pulse_invite');
  }
  .timeline .timeline-item {
    padding-bottom: 0.5em;
  }
</style>
