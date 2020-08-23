<template>
    <div class="container">
        <div
            class="cover-container"
            :style="{ 'background-image': departmentCover }"
        >
            <div class="actions">
                <i class="mdi mdi-arrow-left" />

                <i class="mdi mdi-heart-outline" />
            </div>
        </div>
    </div>
</template>

<script>
import { Departments } from "../data";
import { SET_DEPARTMENT, GET_DEPARTMENT } from "../store/types";
import { createNamespacedHelpers } from "vuex";
import { fetchImage } from "../api";
const { mapActions, mapGetters } = createNamespacedHelpers("departments");

export default {
    mounted() {
        this.getDepartment();
    },

    computed: {
        ...mapGetters({ department: GET_DEPARTMENT }),

        departmentCover() {
            if (this.department && this.department.cover) {
                const url = fetchImage(this.department.cover.url);
                return `url('${url}')`;
            }
        },
    },

    methods: {
        ...mapActions([SET_DEPARTMENT]),

        async getDepartment() {
            const data = await Departments.view(this.$route.params.id);
            this[SET_DEPARTMENT](data);
        },
    },
};
</script>

<style lang="scss" scoped>
.cover-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    height: 320px;
    background-color: gray;
    background-size: cover;
    background-position: center;
    color: white;
    padding: 20px;

    .actions {
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
}
</style>
