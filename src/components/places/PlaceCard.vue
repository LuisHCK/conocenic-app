<template>
    <div class="place card bordered">
        <div class="card-body">
            <div class="card-content">
                <h2 class="title" v-text="place.name" />
                <span class="category" v-text="place.type" />
                <p class="description" v-text="place.description" />
            </div>
            <div class="card-image" :style="placeStyle" />
        </div>
        <div class="card-footer">
            <div class="stars">
                <i
                    v-for="(star, index) in stars"
                    :key="'star-' + index"
                    class="mdi mdi-star"
                />
            </div>
            <router-link :to="'/places/' + place.id" class="action">
                VISITAR
            </router-link>
        </div>
    </div>
</template>

<script>
import { fetchImage } from "../../api";

export default {
    name: "place-card",

    props: {
        place: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    computed: {
        placeStyle() {
            return {
                "background-image": `url("${
                    this.place.cover ? fetchImage(this.place.cover.url) : ""
                }")`,
            };
        },

        stars() {
            return Array(this.place.rating).fill();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.place {
    display: flex;
    flex-direction: column;

    .card-image {
        min-width: 120px;
        height: 120px;
        background-size: cover;
    }

    .card-content {
        width: 100%;
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
        max-width: 90%;
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
