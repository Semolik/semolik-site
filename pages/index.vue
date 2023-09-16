<template>
    <div class="index-page">
        <div class="activities">
            <Discord />
        </div>
        <LastFm />

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
        @include md(true) {
            flex-direction: column;
        }
    }
    .github-activity {
        width: 100%;
        @include xxxxl {
            position: absolute;
            left: 100%;
            top: 10px;

            width: 340px;
            z-index: 1;
        }
    }
}
</style>
