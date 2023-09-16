<template>
    <Card
        v-if="currentTrack"
        :largeImage="currentTrack.image"
        :largeText="currentTrack.artist"
        icon="mdi:lastfm"
        :name="currentTrack.artist"
        :details="details"
        head-text="Играет сейчас"
        bg
        :link="lastFmURL"
        key="last-fm"
    />
</template>
<script setup>
const { LAST_FM_USERNAME } = useRuntimeConfig().public;
const lastFmURL = computed(
    () => `https://www.last.fm/ru/user/${LAST_FM_USERNAME}`
);
const { data: currentTrack } = await useFetch("/api/lastfm");
const details = computed(() =>
    currentTrack.value
        ? [currentTrack.value.name, currentTrack.value.album]
        : []
);

onMounted(() => {
    setInterval(async () => {
        const { data } = await useFetch("/api/lastfm");
        currentTrack.value = data.value;
    }, 30 * 1000);
});
</script>
