<template>
    <div class="news card bordered">
        <div class="card-body">
            <div class="card-image" :style="newsStyle" />
            <div class="card-content">
                <h2 class="title" v-text="news.title" />
                <p class="description" v-text="news.content" />
            </div>
        </div>
    </div>
</template>

<script>
import { fetchImage } from "../../api";

export default {
    name: "news-card",

    props: {
        news: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    computed: {
        newsStyle() {
            return {
                "background-image": `url("${
                    this.news.cover ? fetchImage(this.news.cover.url) : ""
                }")`,
            };
        },

        stars() {
            return Array(this.news.rating).fill();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.news {
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
