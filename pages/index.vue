<template>
    <div class="index-page">
        <Info />
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
}
</style>
