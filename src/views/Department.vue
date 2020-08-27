<template>
    <div class="container">
        <div
            class="cover-container"
            :style="{ 'background-image': departmentCover }"
        >
            <div class="actions">
                <button class="button icon-button" @click="goBack">
                    <i class="mdi mdi-arrow-left" />
                </button>
            </div>

            <div class="info">
                <div class="info-container">
                    <h1>{{ department.name }}</h1>
                    <div>
                        <button class="button icon-button">
                            <i class="mdi mdi-heart-outline" />
                        </button>
                        <button class="button icon-button" @click="share">
                            <i class="mdi mdi-share" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="tabs">
            <div
                class="tab-item"
                :class="{ active: currentTab === index }"
                v-for="(tab, index) in tabs"
                :key="'tab-' + index"
                @click="setTab(index)"
                v-text="tab"
            />
        </div>

        <!-- Home -->
        <div v-show="currentTab === 0" class="tab-content">
            <div
                class="card bordered"
                v-html="parseMD(department.description)"
            ></div>

            <div
                v-if="department.events && department.events.length"
                class="section-title"
            >
                Eventos
            </div>

            <EventCard
                v-for="event in department.events"
                :key="'event-' + event.id"
                :event="event"
            />

            <div class="section-title">
                Noticias
            </div>

            <NewsCard
                v-for="news in department.updates"
                :key="'news-' + news.id"
                :news="news"
            />

            <div class="section-title">
                Fotos
            </div>

            <div class="photos">
                <div
                    class="photo"
                    v-for="photo in department.photos"
                    :key="'photo-' + photo.id"
                    :style="{
                        'background-image': `url(${getPhoto(photo.url)})`,
                    }"
                />
            </div>
        </div>

        <!-- Places -->
        <div class="tab-content" v-show="currentTab === 1">
            <PlaceCard
                v-for="place in department.places"
                :key="place.id"
                :place="place"
            />
        </div>

        <!-- Cities -->
        <div class="tab-content" v-show="currentTab === 2">
            <CityCard
                v-for="city in department.cities"
                :key="'city-' + city.id"
                :city="city"
            />
        </div>
    </div>
</template>

<script>
import { Departments } from "../data";
import { SET_DEPARTMENT, GET_DEPARTMENT } from "../store/types";
import { createNamespacedHelpers } from "vuex";
import { fetchImage } from "../api";
import markdownIt from "markdown-it";
import PlaceCard from "../components/places/PlaceCard";
import CityCard from "../components/places/CityCard";
import EventCard from "../components/places/EventCard";
import NewsCard from "../components/places/NewsCard";

const { mapActions, mapGetters } = createNamespacedHelpers("departments");

const markdownParser = new markdownIt();

export default {
    components: {
        PlaceCard,
        CityCard,
        EventCard,
        NewsCard,
    },

    mounted() {
        this.getDepartment();
    },

    data() {
        return {
            currentTab: 0,
        };
    },

    computed: {
        ...mapGetters({ department: GET_DEPARTMENT }),

        departmentCover() {
            if (this.department && this.department.cover) {
                const url = fetchImage(this.department.cover.url);
                return `url('${url}')`;
            }
        },

        tabs() {
            return ["Inicio", "Lugares", "Municipios"];
        },
    },

    methods: {
        ...mapActions([SET_DEPARTMENT]),

        async getDepartment() {
            const data = await Departments.view(this.$route.params.id);
            this[SET_DEPARTMENT](data);
        },

        goBack() {
            this.$router.push("/");
        },

        setTab(index) {
            this.currentTab = index;
        },

        parseMD(data) {
            return markdownParser.render(data || "");
        },

        getPhoto(url) {
            return fetchImage(url);
        },

        async share() {
            if (navigator.share) {
                const shareData = {
                    title: this.place.name,
                    text: `Visitä ${this.place.nane} a travéz de conocenicaragua.com`,
                };

                await navigator.share(shareData);
            }
        },
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

.tabs {
    background-color: $primary;
    height: 48px;
    display: flex;
    text-transform: uppercase;
    color: white;
    justify-content: space-between;
    align-items: center;

    .tab-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        cursor: pointer;
        transition: 0.3s;

        &.active {
            background-color: darken($primary, 5);
        }
    }
}

.tab-content {
    padding: 15px;
}

.section-title {
    font-weight: bold;
    color: gray;
    margin-top: 25px;
    margin-bottom: 15px;
}

.photos {
    display: flex;
    flex-wrap: wrap;

    .photo {
        width: 50%;
        height: 250px;
        background-size: cover;
        background-position: center;
        outline: 5px solid white;
    }
}
</style>
