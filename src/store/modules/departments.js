import {
    SET_DEPARTMENTS,
    GET_DEPARTMENTS,
    GET_DEPARTMENT,
    SET_DEPARTMENT,
} from "../types";

export default {
    namespaced: true,

    state: {
        departments: [],
        department: {},
    },

    actions: {
        [SET_DEPARTMENTS]({ commit }, departments) {
            commit(SET_DEPARTMENTS, departments);
        },

        [SET_DEPARTMENT]({ commit }, department) {
            commit(SET_DEPARTMENT, department);
        },
    },

    mutations: {
        [SET_DEPARTMENTS](state, departments) {
            state.departments = [...departments];
        },

        [SET_DEPARTMENT](state, department) {
            state.department = department;
        },
    },

    getters: {
        [GET_DEPARTMENTS](state) {
            return state.departments;
        },

        [GET_DEPARTMENT](state) {
            return state.department;
        },
    },
};
