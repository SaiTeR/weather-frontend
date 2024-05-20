import Vuex from "vuex";
import forecast from './modules/forecast.js';

const vuex = new Vuex.Store({
  modules: {
    forecast
  }
});

export default vuex;
