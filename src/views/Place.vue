<template>
    <div class="container">
        <div
            class="cover-container"
            :style="{ 'background-image': placeCover }"
        >
            <div class="actions">
                <button class="button icon-button" @click="goBack">
                    <i class="mdi mdi-arrow-left" />
                </button>
            </div>

            <div class="info">
                <div class="info-container">
                    <div>
                        <h1 v-text="place.name" />
                        <span v-text="place.type" />
                    </div>
                    <div>
                        <button class="button icon-button">
                            <i class="mdi mdi-heart-outline" />
                        </button>
                        <button class="button icon-button">
                            <i class="mdi mdi-share" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Description -->
        <div style="padding: 15px">
            <div class="card bordered">
                <div v-html="parseMD(place.description)" />

                <p class="phone">
                    <i class="mdi mdi-phone" style="margin-right: 10px" />
                    <a :href="'tel:+' + place.phone">
                        {{ place.phone }}
                    </a>
                </p>

                <div class="schedule">
                    <i class="mdi mdi-clock" style="margin-right: 10px" />
                    {{ parseTime(place.open_at) }} -
                    {{ parseTime(place.open_at) }}
                </div>
            </div>
        </div>

        <!-- Photos -->
        <div class="photos-container">
            <div
                v-for="photo in place.photos"
                :key="'photo' + photo.id"
                style="padding: 15px"
                class="photo"
            >
                <div
                    class="card"
                    :style="{ 'background-image': getImage(photo.url) }"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Places from "../data/places";
import { fetchImage } from "../api";
import markdownIt from "markdown-it";
import moment from "../helpers/moment";

const markdownParser = new markdownIt();

export default {
    data() {
        return {
            place: {},
        };
    },

    computed: {
        placeCover() {
            if (this.place && this.place.cover) {
                const url = fetchImage(this.place.cover.url);
                return `url('${url}')`;
            }
        },
    },

    methods: {
        async getPlace() {
            this.place = await Places.view(this.$route.params.id);
        },

        goBack() {
            window.history.back();
        },

        parseMD(data) {
            return markdownParser.render(data || "");
        },

        parseTime(data) {
            return moment(data, "HH:mm:ss:Z").format("hh:mm A");
        },

        getImage(url) {
            return `url("${fetchImage(url)}")`;
        },
    },

    mounted() {
        this.getPlace();
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

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
    position: relative;
    transition: 0.5s;

    .actions {
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .info {
        background-color: transparentize($blue-grey-900, 0.4);
        width: 100%;
        position: absolute;
        bottom: 0;

        h1 {
            margin: 0px;
        }

        .info-container {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
.phone {
    color: $blue;
    a {
        text-decoration: none;
        color: inherit;
    }
}

.photos-container {
    display: flex;
    flex-wrap: wrap;

    .photo {
        width: 45%;
        height: 300px;
        display: flex;

        &:nth-child(odd) {
            padding-right: 0px;
        }

        .card {
            background-size: cover;
            background-position: center;
            width: 100%;
        }
    }
}
</style>
