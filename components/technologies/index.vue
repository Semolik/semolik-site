<template>
    <div class="technologies-container">
        <technologies-item
            v-for="technology in technologies"
            :key="technology"
            :technology="technology"
        />
    </div>
</template>
<style lang="scss" scoped>
.technologies-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    padding: 20px;
    gap: 5px;
}
</style>

<script setup>
const technologies = [
    {
        name: "Vue",
        color: "#4FC08D",
        icon: "vscode-icons:file-type-vue",
    },
    {
        name: "Nuxt",
        color: "#00C58E",
        icon: "vscode-icons:file-type-nuxt",
    },
    {
        name: "React",
        color: "#61DAFB",
        icon: "vscode-icons:file-type-reactjs",
    },
    {
        name: "Python",
        color: "#3776AB",
        icon: "vscode-icons:file-type-python",
    },
    {
        name: "FastAPI",
        color: "#009688",
        icon: "simple-icons:fastapi",
    },
    {
        name: "SQLAlchemy",
        color: "#ffda44",
        icon: "vscode-icons:file-type-sql",
    },
    {
        name: "PostgreSQL",
        icon: "logos:postgresql",
        color: "#336791",
    },
];
</script>
