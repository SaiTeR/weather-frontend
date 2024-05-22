const actions = {
  async fetchForecast({ commit }) {
    const url = 'http://weather/api/forecast';
    const response = await fetch(url);
    const json = await response.json()
    commit('setForecast', { forecast: json });
    console.log(json)
  }
}

const mutations = {
  setForecast(state, { forecast }) {
    state.forecast = forecast;
    state.currentWeather = forecast[0][0];
    state.todayWeather = forecast[0];
    state.futureWeather = [
        forecast[1],
        forecast[2],
        forecast[3],
        forecast[4]
    ];
  }
}

const state = {
  forecast: null,
  currentWeather: null,
  todayWeather: null,
  futureWeather: null,
}

const getters = {
  getForecast(state) {
    return state.forecast;
  },

  getCurrentWeather(state) {
    return state.currentWeather;
  },

  getTodayWeather(state) {
    return state.todayWeather;
  },

  getFutureWeather(state) {
    return state.futureWeather;
  }
}

const forecast = {
  actions: actions,
  mutations: mutations,
  state: state,
  getters: getters
}

export default forecast;
