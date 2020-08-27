<template>
    <div class="event card bordered">
        <div class="card-body">
            <div class="card-content">
                <h2 class="title" v-text="event.name" />
                <span class="category" v-text="parseTime(event.start_at)" />
                <p class="description" v-text="event.description" />
            </div>
            <div class="card-image" :style="eventStyle" />
        </div>
    </div>
</template>

<script>
import { fetchImage } from "../../api";
import moment from "../../helpers/moment";

export default {
    name: "event-card",

    props: {
        event: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    computed: {
        eventStyle() {
            return {
                "background-image": `url("${
                    this.event.cover ? fetchImage(this.event.cover.url) : ""
                }")`,
            };
        },

        stars() {
            return Array(this.event.rating).fill();
        },
    },

    methods: {
        parseTime(data) {
            return moment(data, "HH:mm:ss:Z").format("hh:mm A");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.event {
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
