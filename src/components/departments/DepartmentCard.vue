<template>
    <div
        class="department-card"
        :style="{ 'background-image': departmentCover }"
        @click="showDepartment"
    >
        <div class="title">
            <h1 v-text="department.name" />
        </div>
    </div>
</template>

<script>
import { fetchImage } from "../../api";
export default {
    name: "department",

    props: {
        department: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    computed: {
        departmentCover() {
            if (this.department && this.department.cover) {
                const url = fetchImage(this.department.cover.url);
                return `url('${url}')`;
            }
        },
    },

    methods: {
        showDepartment() {
            this.$router.push("/departments/" + this.department.id);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.department-card {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 320px;
    background-color: gray;
    background-size: cover;
    background-position: center;
    cursor: pointer;

    .title {
        width: 100%;
        background-color: transparentize($blue-grey-900, 0.4);
        color: white;
        text-align: center;
    }
}
</style>
