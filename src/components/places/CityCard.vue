<template>
    <div class="city card bordered">
        <div class="card-body">
            <div class="card-image" :style="cityStyle" />
            <div class="card-content">
                <h2 class="title" v-text="city.name" />
                <p class="description" v-text="city.short_description" />
            </div>
        </div>
    </div>
</template>

<script>
import { fetchImage } from "../../api";

export default {
    name: "city-card",

    props: {
        city: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    computed: {
        cityStyle() {
            return {
                "background-image": `url("${
                    this.city.cover ? fetchImage(this.city.cover.url) : ""
                }")`,
            };
        },

        stars() {
            return Array(this.city.rating).fill();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.city {
    display: flex;
    flex-direction: column;

    .card-image {
        min-width: 150px;
        height: 150px;
        background-size: cover;
        background-position: center;
    }

    .card-content {
        width: 100%;
        padding-left: 20px;
    }

    .title {
        margin-top: 0px;
        margin-bottom: 10px;
    }

    .category {
        color: $grey-700;
    }

    .description {
        font-size: 14px;
    }

    .stars {
        font-size: 22px;
        color: $amber-400;
    }

    .action {
        text-decoration: none;
        font-weight: bold;
        color: $blue;
    }
}
</style>
