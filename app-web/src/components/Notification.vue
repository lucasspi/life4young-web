<template>
  <transition
    :name="transition"
    mode="in-out"
    appear
    :appear-active-class="enterClass"
    :enter-active-class="enterClass"
    :leave-active-class="leaveClass"
    @after-leave="afterLeave"
  >
    <div :class="['notification', 'animated', type ? `is-${type}` : '']" v-if="show">
      <div class="media">
        <a :href="url ? url : `javascript:void(0);`">
          <figure class="media-left" v-if="thumb">
            <p class="image is-32x32">
              <img :src="thumb" :alt="title || message">
            </p>
          </figure>
          <div class="media-content">
            <div class="subtitle is-6" v-if="title">{{ title }}</div>
            <div class="is-size-7" v-if="html" v-html="message"></div>
            <div class="is-size-7" v-else>{{ message }}</div>
            <div class="is-size-7" v-if="action">
              <p class="is-size-7 has-text-centered"><span class="tag is-black" v-html="action"></span></p>
            </div>
            <div v-if="from_now"><small class="has-text-grey-light is-size-7" v-html="from_now"></small></div>
          </div>
        </a>
        <button class="delete touchable" @click="closedByUser()"></button>
        <button class="btn-no-sound is-hidden-mobile touchable button has-icons-left is-outlined is-rounded is-small touchable has-icons-left" @click="notification_stop_play_sound === '1' ? startNotificationSound() : stopNotificationSound()">
          <span class="icon">
            <font-awesome-icon :icon="notification_stop_play_sound === '1' ? 'volume-off' : 'volume-up'"></font-awesome-icon>
          </span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue'
  import moment from 'moment'
  import {Howl} from 'howler';

  export default {
    props: {
      type: String,
      title: String,
      message: String,
      direction: {
        type: String,
        default: 'Right'
      },
      position: {
        type: String,
        default: '.top-right'
      },
      duration: {
        type: Number,
        default: 4500
      },
      container: {
        type: String,
        default: '.notifications'
      },
      thumb: String,
      html: {
        type: Boolean,
        default: false
      },
      dateTime: {
        type: String
      },
      action: String,
      url: String
    },
    data () {
      return {
        notification_stop_play_sound: localStorage.getItem('notification_stop_play_sound'),
        $_parent_: null,
        show: true
      }
    },
    created () {
      let $parent = this.$parent
      if (!$parent) {
        let parent = document.querySelector(this.container_query)
        if (!parent) {
          // Lazy creating `div.notifications` container.
          const className = this.container.replace('.', '')
          const positionClassName = this.position.replace('.', '')
          const Notifications = Vue.extend({
            name: 'Notifications',
            render (h) {
              return h('div', {
                'class': {
                  [`${className}`]: true,
                  [`${positionClassName}`]: true
                }
              })
            }
          })
          $parent = new Notifications().$mount()
          document.body.appendChild($parent.$el)
        } else {
          $parent = parent.__vue__
        }
        // Hacked.
        this.$_parent_ = $parent
      }
    },
    mounted () {
      if (this.$_parent_) {
        this.$_parent_.$el.appendChild(this.$el)
        this.$parent = this.$_parent_
        delete this.$_parent_
      }
      if (this.duration > 0) {
        this.timer = setTimeout(() => this.close(), this.duration)
      }
      let playNotificationSound = localStorage.getItem('notification_stop_play_sound');
      if (!playNotificationSound || playNotificationSound === '0')
        var sound = new Howl({
          src: [
            'https://escola.nyc3.cdn.digitaloceanspaces.com/content/audio/notification_sound.mp3',
            'https://escola.nyc3.cdn.digitaloceanspaces.com/content/audio/notification_sound.wav'
          ],
          autoplay: true,
          volume: 1,
          onend: function() {
            console.log('Finished!');
          }
        });

    },
    destroyed () {
      this.$el.remove()
    },
    computed: {
      transition () {
        return `bounce-${this.direction}`
      },
      enterClass () {
        return `bounceIn${this.direction}`
      },
      leaveClass () {
        return `bounceOut${this.direction}`
      },
      container_query () {
        return `${this.container}${this.position}`
      },
      from_now() {
        return this.dateTime ? moment(this.dateTime).fromNow() : null;
      }
    },
    methods: {
      closedByUser () {
        this.$emit('closed-by-user')
        clearTimeout(this.timer)
        this.show = false
      },
      close () {
        this.$emit('closed-automatically')
        clearTimeout(this.timer)
        this.show = false
      },
      afterLeave () {
        this.$destroy()
      },
      stopNotificationSound() {
        this.notification_stop_play_sound = '1'
        localStorage.setItem('notification_stop_play_sound', '1');
        alert('1')
      },
      startNotificationSound() {
        this.notification_stop_play_sound = '0'
        console.log(this.notification_stop_play_sound);
        localStorage.setItem('notification_stop_play_sound', '0');
      }
    }
  }
</script>

<style lang="scss">
  /*@import '~bulma/sass/utilities/initial-variables';*/
  @import '~bulma/sass/utilities/mixins';
  .notifications {
    position: fixed;
    top: 50px;
    right: 0;
    &.top-right {
      top: 50px; right: 0;
      left: initial; bottom: initial;
    }
    &.bottom-left {
      top: initial;
      right: initial;
      bottom: 50px; left: 0;
    }
    z-index: 1024 + 233;
    pointer-events: none;
    @include mobile() {
      &, &.top-right, &.bottom-left {
        left: 0;
        right: 0;
        top: 0;
      }
    }
    .notification {
      margin: 20px;
      padding: 20px 30px 20px 20px;
      a {
        &, &:not(.button):not(.dropdown-item) {
          text-decoration: none;
        }
      }
      @include mobile() {
        margin: 0;
        padding: 0;
        p {
          margin: 0
        }
        .media-content > div { display: inline; line-height: 0.75rem }
        .media-left .image {
          margin: 5px;
        }
        .delete {
          top: initial;
          bottom: 0; right: 0;
          border-radius: 0;
        }
      }
    }
  }
  .notification {
    position: relative;
    min-width: 300px;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    pointer-events: all;
    .delete {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .btn-no-sound {
      background-color: rgba(0, 0, 0, 0.2);
      border: 0;
      padding: 0 6px;
      height: 19px;
      right: 10px;
      top: 35px;
      position: absolute;
      .icon {
        margin: 0;
        height: 0.75rem;
        svg {
          color: #FFF;
          height: 17px;
        }
      }
    }
  }
</style>
