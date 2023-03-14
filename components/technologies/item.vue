<template>
    <div class="technology-item">
        <Icon :name="technology.icon" />
        <div class="technology-item-name">{{ technology.name }}</div>
    </div>
</template>
<script setup>
const { technology } = defineProps({
    technology: {
        type: Object,
        required: true,
    },
});
const color = ref(technology.color);
</script>
<style lang="scss" scoped>
.technology-item {
    display: flex;
    align-items: center;
    gap: 10px;

    // padding: 10px 20px;
    padding: 5px 20px;
    background-color: rgba($color: white, $alpha: 0.2);
    border-radius: 10px;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border: 1px solid transparent;
    transition: all 0.2s;
    z-index: 1;
    &::after {
        z-index: 0;
        content: "";
        background-color: v-bind(color);
        position: absolute;
        inset: 0;
        opacity: 0;
    }
    &:hover {
        border-color: v-bind(color);
        &::after {
            opacity: 0.1;
        }
        box-shadow: 0 0 20px v-bind(color) inset;
    }
    svg {
        width: 40px;
        height: 40px;
    }
    .technology-item-name {
        text-align: center;
        width: 100%;
    }
}
</style>
