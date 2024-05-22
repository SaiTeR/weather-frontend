<template>
  <div class="container" v-if="getCurrentWeather">

    <div class="date">
      <p>{{ todayDate }}</p>
      <p>Время {{timeNow}}</p>
      <p>{{timeOfDay}}</p>
    </div>

    <div class="curWeather">
      <p>{{Math.floor(getCurrentWeather.temperature)}} °C</p>
    </div>

    <div class="detailedWeather">
      <p>Ощущается как: {{Math.floor(getCurrentWeather.temperature_feels_like)}} °C</p>
      <p>Скорость ветра: {{ getCurrentWeather.wind_speed.toFixed(2) }} м/с</p>
      <p>Влажность: {{getCurrentWeather.humidity}}%</p>
      <p>Давление: {{getCurrentWeather.pressure}} мм рт. ст.</p>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "CurrenHourForecast",

  data() {
    return {
      todayDate: "",
      timeNow: "",
      timeOfDay: "",
    }
  },

  mounted() {
    this.todayDate = this.getTodayDate();
    this.timeNow = this.getCurrentTime();
    this.timeOfDay = this.getTimeOfDay();
  },

  computed: mapGetters([
    'getCurrentWeather',
    'getForecast'
  ]),

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
  },
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
