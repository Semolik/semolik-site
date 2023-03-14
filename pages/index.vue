<template>
    <div class="index-page">
        <Technologies />
    </div>
</template>
<script setup>
const words = [
    "Vue.js",
    "Nuxt.js",
    "JavaScript",
    "React.js",
    "fastapi",
    "Python",
    "sqlalchemy",
    "PostgreSQL",
    "Docker",
];
</script>
<style lang="scss" scoped>
.index-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1;
    align-items: center;
}
</style>
