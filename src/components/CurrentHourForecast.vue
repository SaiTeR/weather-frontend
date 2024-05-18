<template>
  <div class="container">

    <div class="date">
      <p>{{ todayDate }}</p>
      <p>Время {{timeNow}}</p>
      <p>{{timeOfDay}}</p>
    </div>

    <div class="curWeather" v-if="currentHourForecast">
      <p>{{Math.floor(currentHourForecast.temperature)}} °C</p>
    </div>

    <div class="detailedWeather" v-if="currentHourForecast">
      <p>Ощущается как: {{Math.floor(currentHourForecast.temperature_feels_like)}} °C</p>
      <p>Скорость ветра: {{currentHourForecast.wind_speed}} м/с</p>
      <p>Влажность: {{currentHourForecast.humidity}}%</p>
      <p>Давление: {{currentHourForecast.pressure}} мм рт. ст.</p>
    </div>

  </div>
</template>




<script>
export default {
  name: "CurrenHourForecast",

  mounted() {
    this.todayDate = this.getTodayDate();
    this.timeNow = this.getCurrentTime();
    this.timeOfDay = this.getTimeOfDay();

    this.updateCurrentHourForecast();
  },

  data() {
    return {
      todayDate: "",
      timeNow: "",
      timeOfDay: "",
      currentHourForecast: null,
    }
  },

  methods: {
    getTodayDate() {
      const today = new Date();

      const shortDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      const dayIndex = today.getDay();
      const shortDayName = shortDays[dayIndex];

      const options = {
        day: 'numeric',
        month: 'long',
      };

      const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(today);

      const year = today.getFullYear();
      const yearWithSuffix = `${year} год`;

      // Собираем итоговую строку
      const formattedData = `${shortDayName}, ${formattedDate} ${yearWithSuffix}`;

      return formattedData;
    },

    getCurrentTime() {
      const now = new Date();

      let hours = now.getHours();
      let minutes = now.getMinutes();

      // Дополняем минуты нулем, если они менее 10
      minutes = minutes < 10 ? '0' + minutes : minutes;

      // Формируем строку в формате "H-M"
      const timeNow = `${hours}:${minutes}`;

      return timeNow;
    },

    getTimeOfDay() {
      const now = new Date();
      const hours = now.getHours();

      let timeOfDay;

      if (hours >= 6 && hours < 12) {
        timeOfDay = 'Утро';
      } else if (hours >= 12 && hours < 18) {
        timeOfDay = 'День';
      } else if (hours >= 18 && hours < 24) {
        timeOfDay = 'Вечер';
      } else {
        timeOfDay = 'Ночь';
      }

      return timeOfDay;
    },

    updateCurrentHourForecast() {
      const weatherArray = this.$parent.$data.weatherArray;

      if (weatherArray && Array.isArray(weatherArray) && weatherArray.length > 1) {
        const firstArray = weatherArray[1];

        if (Array.isArray(firstArray) && firstArray.length > 0) {
          this.currentHourForecast = firstArray[0];
        } else {
          console.error('Первый вложенный массив не существует или пуст.');
        }
      } else {
        console.error('Массив weatherArray не существует или недостаточно длинный.');
      }
    },

  },

  watch: {
    '$parent.$data.weatherArray': {
      handler(newValue) {
        this.updateCurrentHourForecast();
      },
      deep: true
    }
  },

  // computed: {
  //   formattedTemperature() {
  //     if (!this.currentHourForecast || this.currentHourForecast.temperature == null) {
  //       return '';
  //     }
  //
  //     const temperature = this.currentHourForecast.temperature;
  //     return temperature > 0 ? `+${temperature}` : `${temperature}`;
  //   }
  // }
}

</script>

<style scoped>

.container{
  display: flex;
  flex-direction: row;

  border: 1px solid;
}

.date{

}

.curWeather{
  display: flex;

  margin-left: 2em;
  margin-right: 2em;
  margin-top: 1em;

  border: 1px solid;

  text-align: center;
  justify-content: center;
  align-items: center;

  height: 6em; /* или другая подходящая высота */
}

.detailedWeather p {
}
</style>