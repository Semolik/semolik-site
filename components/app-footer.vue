<template>
    <div class="app-footer">
        <div class="name">Semolik {{ year }}</div>

        <a
            class="github-link"
            href="https://github.com/Semolik/semolik-site"
            target="_blank"
        >
            <Icon name="mdi:github" />
        </a>
    </div>
</template>
<script setup>
const year = new Date().getFullYear();
</script>
<style lang="scss">
.app-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    height: 60px;
    width: 100%;
    gap: 10px;
    color: $text-color-secondary;

    .name {
        font-size: 16px;
    }

    .github-link {
        width: 28px;
        height: 28px;
        color: $text-color-secondary;
        transition: color 0.3s ease;
        &:hover {
            color: $text-color;
        }

        svg {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
