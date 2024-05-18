<template>
  <div class="container" v-if="temperatures">
    <div class="next-day-card">
      <p style="text-align: center">{{nextDaysNames[0]}}</p>
      <div style="display: flex; flex-direction: row">
        <p>{{temperatures[0].maxTemp}} °C</p>
        <p style="margin-left: 1em">{{temperatures[0].minTemp}} °C</p>
      </div>
    </div>

    <div class="next-day-card">
      <p style="text-align: center">{{nextDaysNames[1]}}</p>
      <div style="display: flex; flex-direction: row">
        <p>{{temperatures[1].maxTemp}} °C </p>
        <p style="margin-left: 1em">{{temperatures[1].minTemp}} °C</p>
      </div>
    </div>

    <div class="next-day-card">
      <p style="text-align: center">{{nextDaysNames[2]}}</p>
      <div style="display: flex; flex-direction: row">
        <p>{{temperatures[2].maxTemp}} °C </p>
        <p style="margin-left: 1em">{{temperatures[2].minTemp}} °C</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FutureForecast",

  data() {
    return {
      nextDaysNames: this.getNextDaysNames(),

      nextDays: null,
      temperatures: null,

    }
  },

  methods: {
    getNextDaysNames() {
      const today = new Date();
      const dayIndex = today.getDay();

      const shortDaysNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

      const nextDaysNames = [
        shortDaysNames[dayIndex + 1],
        shortDaysNames[dayIndex + 2],
        shortDaysNames[dayIndex + 3]
      ];

      return nextDaysNames;
    },

    calcDayMinMaxTemp() {
      let daysMinMaxTemp = [];

      this.nextDays.forEach(day => {
        let minTemp = Infinity;
        let maxTemp = -Infinity;

        day.forEach(hour => {
          minTemp = Math.min(hour.temperature, minTemp);
          maxTemp = Math.max(hour.temperature, maxTemp);
        })

        daysMinMaxTemp.push({
          maxTemp: Math.floor(maxTemp),
          minTemp: Math.floor(minTemp)
        });
      })

      this.temperatures = daysMinMaxTemp;
    },

    updateNextDaysForecast() {
      const weatherArray = this.$parent.$data.weatherArray;

      if (weatherArray && Array.isArray(weatherArray) && weatherArray.length > 1) {
        this.nextDays = [
            weatherArray[2],
            weatherArray[3],
            weatherArray[4]
        ]
      }
    },


  },

  watch: {
    '$parent.$data.weatherArray': {
      handler(newValue) {
        this.updateNextDaysForecast();
        this.calcDayMinMaxTemp();
      },
      deep: true
    }
  },
}
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: row;
}
.next-day-card{
  border: 1px solid;
  margin-left: 1em;
}
</style>