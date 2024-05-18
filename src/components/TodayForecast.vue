<template>
  <div class="container" v-if="dayForecast">
    <div>
      <p>Ночь</p> <p>{{}}</p> <p>{{}}</p>
    </div>

    <div>
      <p>Утро</p> <p>{{}}</p> <p>{{}}</p>
    </div>

    <div>
      <p>День</p> <p>{{}}</p> <p>{{}}</p>
    </div>

    <div>
      <p>Вечер</p> <p>{{}}</p> <p>{{}}</p>
    </div>
  </div>

</template>

<script>
export default {
  name: "TodayForecast",

  data() {
    return {
      dayForecast: null,
    }
  },

  mounted() {
    console.log("HU!!!!!!")
  },

  methods: {
    updateDayForecast() {
      const weatherArray = this.$parent.$data.weatherArray;

      if (weatherArray && Array.isArray(weatherArray) && weatherArray.length > 1) {
        this.dayForecast = weatherArray[1];
      }
    },


  },

  watch: {
    '$parent.$data.weatherArray': {
      handler(newValue) {
        this.updateDayForecast();
      },
      deep: true
    }
  },
}
</script>

<style scoped>

.container{
  border: 1px solid;
  width: 50%;
}

.container div {
  display: flex;
  flex-direction: row;
}

</style>