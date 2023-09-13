<template>
    <a
        class="current-playing"
        v-if="currentTrack"
        target="_blank"
        :href="lastFmURL"
    >
        <img :src="currentTrack.image" alt="" class="bg" />
        <div class="lastfm-icon" title="LastFM">
            <Icon name="mdi:lastfm" />
        </div>
        <div class="artist-info">
            <div class="artist-name ellipsis" title="Исполнитель">
                {{ currentTrack.artist }}
            </div>
        </div>
        <div class="track">
            <img :src="currentTrack.image" alt="" />
            <div class="info">
                <div class="now-playing">Играет сейчас</div>
                <div class="name ellipsis">
                    {{ currentTrack.name }}
                </div>
                <div class="album ellipsis">
                    {{ currentTrack.album }}
                </div>
            </div>
        </div>
    </a>
</template>
<script setup>
const { LAST_FM_USERNAME } = useRuntimeConfig().public;
const lastFmURL = computed(
    () => `https://www.last.fm/ru/user/${LAST_FM_USERNAME}`
);
const { data: currentTrack } = await useFetch("/api/lastfm");
onMounted(() => {
    setInterval(async () => {
        const { data } = await useFetch("/api/lastfm");
        currentTrack.value = data.value;
    }, 30 * 1000);
});
</script>
<style lang="scss" scoped>
.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.current-playing {
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 10px;
    text-decoration: none;
    color: $text-color;
    max-width: 350px;
    width: 100%;
    border-radius: 16px;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    gap: 10px;
    @include lg(true) {
        max-width: 100%;
    }
    .lastfm-icon {
        position: absolute;
        top: 10px;
        right: 15px;
        width: 20px;
        height: 20px;
        svg {
            color: $text-color-secondary;
            width: 100%;
            height: 100%;
        }
    }
    .bg {
        position: absolute;
        inset: 0;
        object-fit: cover;
        width: 100%;
        height: 100%;
        filter: blur(10px) brightness(0.4);
        z-index: -1;
        transition: filter 0.3s ease;
    }

    .artist-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;

        .artist-name {
            font-size: 1.1em;
            font-weight: 600;
        }
        .tracks-plays {
            font-size: 0.9em;
            color: $text-color-secondary;
            white-space: nowrap;
            @include xs(true) {
                span {
                    display: none;
                }
            }
        }
    }

    .track {
        display: flex;

        gap: 10px;
        .info {
            display: flex;
            flex-direction: column;
            gap: 5px;
            overflow: hidden;
            justify-content: center;
            .now-playing {
                font-size: 0.8em;
                color: $text-color-secondary;
            }
            .name {
                font-size: 1.2em;
                font-weight: 600;
            }
            .album {
                font-size: 0.9em;
                color: $text-color-secondary;
            }
        }
        img {
            width: 90px;
            height: 90px;
            object-fit: cover;
            border-radius: 8px;
        }
    }
}
</style>
