<template>
    <div class="container">
        <DepartmentCard
            v-for="department in departments"
            :key="department.id"
            :department="department"
        />
    </div>
</template>

<script>
import DepartmentCard from "../components/departments/DepartmentCard";
import { SET_DEPARTMENTS, GET_DEPARTMENTS } from "../store/types";
import { Departments } from "../data";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("departments");

export default {
    name: "Home",

    components: {
        DepartmentCard,
    },

    mounted() {
        this.getDepartments();
    },

    methods: {
        ...mapActions([SET_DEPARTMENTS]),

        async getDepartments() {
            const departments = await Departments.list();

            this[SET_DEPARTMENTS](departments);
        },
    },

    computed: {
        ...mapGetters({ departments: GET_DEPARTMENTS }),
    },
};
</script>
