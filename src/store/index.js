import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import departments from "./modules/departments";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        departments,
    },
    plugins: [new VuexPersistence().plugin],
});
