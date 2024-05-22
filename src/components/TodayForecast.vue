<template>
  <div class="container" v-if="getTodayWeather">

    <div v-for="period in getTodayWeather.slice(1)" class="period">
      <p style="margin-left: 20px">{{getTime(period.datetime_text)}}</p>
      <p>{{Math.floor(period.temperature)}} °C</p>
      <p>{{period.wind_speed}} м/с </p>
      <p>{{period.humidity}}%</p>
      <p>{{period.pressure}} мм рт. ст.</p>

    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "TodayForecast",

  data() {
    return {

    }
  },

  mounted() {

  },

  computed: mapGetters([
    'getTodayWeather'
  ]),

  methods: {
    getTime(datetimeText) {
      return datetimeText.split(' ')[1];
    }
  },

}
</script>

<style scoped>

.container{
  border: 1px solid;
  width: 45%;
}

.container div {
  display: flex;
  flex-direction: row;
}
.period{
  border: 1px solid;
}


.period p{
  padding-right: 50px;
}

</style>