<template>
  <div class="columns is-mobile is-centered countdown">
    <div class="column time-unite created" v-if="years">
      <div class="time-unit-label">{{ $t('countdown.years') }}</div>
      <div class="time-unite-value"><span>{{ years }}</span></div>
    </div>
    <div class="column time-unite created" v-if="months">
      <div class="time-unit-label">{{ $t('countdown.months') }}</div>
      <div class="time-unite-value"><span>{{ months }}</span></div>
    </div>
    <div class="column time-unite created" v-if="days">
      <div class="time-unit-label">{{ $t('countdown.days') }}</div>
      <div class="time-unite-value"><span>{{ days }}</span></div>
    </div>
    <div class="column time-unite created">
      <div class="time-unit-label">{{ $t('countdown.hours') }}</div>
      <div class="time-unite-value"><span>{{ hours }}</span></div>
    </div>
    <div class="column time-unite created">
      <div class="time-unit-label">{{ $t('countdown.minutes') }}</div>
      <div class="time-unite-value"><span>{{ minutes }}</span></div>
    </div>
    <div class="column time-unite created">
      <div class="time-unit-label">{{ $t('countdown.seconds') }}</div>
      <div class="time-unite-value"><span>{{ seconds }}</span></div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    props: ['until'],
    data () {
      return {
        actualTime: moment().format('X'),
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ended: false
      }
    },
    methods: {
      addOneSecondToActualTimeEverySecond () {
        var component = this
        component.actualTime = moment().format('X')
        setTimeout(function(){
          component.addOneSecondToActualTimeEverySecond()
        }, 1000);
      },
      getDiffInSeconds () {
        return moment(this.until).format('X') - this.actualTime
      },
      compute () {
        let seconds = this.getDiffInSeconds();
        if (!this.ended) {
          this.$emit('ended');
          this.ended = true;
        }
        var duration = moment.duration(seconds, "seconds")
        this.years = duration.years() > 0 ? duration.years() : 0
        this.months = duration.months() > 0 ? duration.months() : 0
        this.days = duration.days() > 0 ? duration.days() : 0
        this.hours = duration.hours() > 0 ? duration.hours() : 0
        this.minutes = duration.minutes() > 0 ? duration.minutes() : 0
        this.seconds = duration.seconds() > 0 ? duration.seconds() : 0
      }
    },
    created () {
      this.compute()
      this.addOneSecondToActualTimeEverySecond()
    },
    watch: {
      actualTime (val,oldVal) {
        this.compute()
      }
    }
  }
</script>

<style lang="scss">
.countdown {
  .time-unite {
    background-color: rgba(0,0,0,0.1);
    margin: 1px;
    .time-unit-label {
      font-size: 13px;
      text-align: center;
    }
    .time-unite-value {
      text-align: center;
      font-size: 24px;
    }
  }
}
</style>
