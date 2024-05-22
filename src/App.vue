<template>
  <curren-hour-forecast></curren-hour-forecast>

  <div style="display: flex; flex-direction: row; margin-top: 1em">
    <today-forecast></today-forecast>
    <future-forecast></future-forecast>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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

  async mounted() {
    await this.fetchForecast();
  },

  computed: mapGetters([
    'getForecast'
  ]),

  methods: {
    ...mapActions([
      'fetchForecast'
    ]),

  }
}
</script>

<style scoped>

</style>
