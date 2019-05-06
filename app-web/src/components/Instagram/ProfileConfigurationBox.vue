<template>
  <div class="box" :class="cssClasses">
    <article class="media">
      <div class="media-left">
        <vue-material-icon v-if="['waiting', 'syncing'].indexOf(profile.status) > -1" name="hourglass_empty" :size="64" color="#ccc"></vue-material-icon>
        <vue-material-icon v-if="profile.status == 'synced'" name="check_circle" :size="64" color="green"></vue-material-icon>
        <vue-material-icon v-if="profile.status == 'error'" name="check_circle" :size="64" color="red"></vue-material-icon>
      </div>
      <div class="media-content">
        <nav class="level">
          <div class="level-item has-text-left">
            <p style="width:100%"><strong>{{$t('instagram.profile-label')}}</strong> {{ profile.username }}</p>
          </div>
          <div class="level-item has-text-right">
            <p style="width:100%"><strong>{{$t('instagram.status-label')}}</strong> {{profile.status_str}}</p>
          </div>
        </nav>
        <div class="content">
          <div v-if="profile.status == 'error'">
            <p>{{ $t('instagram.errors.syncError') }}</p>
            <p>{{ profile.status_feedback }}</p>
          </div>
          <div v-else>
            <p>{{$t('instagram.status-waiting-message')}}</p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'profile-configuration-box',

  props: ['profile', 'css-classes'],

  components: {
  },


  data() {

    return {
    };
  },

  methods: {
  }
};
</script>

<style lang="scss">
</style>
