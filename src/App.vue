<template>
  <curren-hour-forecast></curren-hour-forecast>

  <div style="display: flex; flex-direction: row">
    <today-forecast></today-forecast>
    <future-forecast></future-forecast>
  </div>

</template>

<script>
import axios from "axios";
import CurrenHourForecast from "@/components/CurrentHourForecast.vue";
import TodayForecast from "@/components/TodayForecast.vue";
import FutureForecast from "@/components/FutureForecast.vue";

export default {
  name: "HomePage",
  components: {CurrenHourForecast, TodayForecast, FutureForecast},

  data() {
    return {
      weatherArray: null
    }
  },

  mounted() {
    this.getWeather();
  },

  methods: {
    getWeather() {
      axios.get('http://weather.api/api/')
          .then(response => {
            console.log(response);
            this.weatherArray = response.data;

          })
          .catch(error => {
            console.error('Error while fetching content:', error);
          });
    },


  }
}
</script>

<style scoped>

</style>
