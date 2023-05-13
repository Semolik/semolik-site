<template>
    <div class="current-playing"></div>
</template>
<script setup>
const { data: currentTrack } = await useFetch("/api/lastfm");
onMounted(() => {
    setInterval(async () => {
        const { data } = await useFetch("/api/lastfm");
        currentTrack.value = data;
    }, 60 * 1000);
});
</script>
<style lang="scss" scoped>
.current-playing {
}
</style>
