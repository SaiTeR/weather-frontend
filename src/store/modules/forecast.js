const actions = {
  async fetchForecast({ commit }) {
    const url = 'http://weather/api/forecast';
    const response = await fetch(url);
    commit('setForecast', { forecast: await response.json() });
  }
}

const mutations = {
  setForecast(state, { forecast }) {
    state.forecast = forecast;
    state.currentWeather = forecast[0][0];
  }
}

const state = {
  forecast: null,
  currentWeather: null,
}

const getters = {
  getForecast(state) {
    return state.forecast;
  },

  getCurrentWeather(state) {
    return state.currentWeather;
  }
}

const forecast = {
  actions: actions,
  mutations: mutations,
  state: state,
  getters: getters
}

export default forecast;
