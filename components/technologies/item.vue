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
    justify-content: center;
    padding: 10px;
}
</style>
