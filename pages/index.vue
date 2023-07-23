<template>
    <div class="index-page">
        <div class="activities">
            <Teleport
                to="#activities"
                :disabled="$viewport.isLessThan('xxxxl')"
            >
                <Lastfm class="lastfm" />
                <Discord class="discord" />
            </Teleport>
        </div>
        <Codestats />
        <Projects />
    </div>
</template>
<script setup>
useHead({
    title: "Главная",
});
</script>
<style lang="scss" scoped>
.index-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 10px;
    flex: 1;
    .activities {
        display: flex;
        gap: 10px;
        width: 100%;

        &:empty {
            display: none;
        }
    }
}
</style>
