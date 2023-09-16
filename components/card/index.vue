<template>
    <a :href="link" target="_blank" class="card" v-if="link">
        <card-content v-bind="$attrs" />
    </a>
    <div class="card" v-else>
        <card-content v-bind="$attrs">
            <template>
                <slot />
            </template>
        </card-content>
    </div>
</template>
<script setup>
defineProps({
    link: {
        type: String,
        default: null,
    },
});
</script>
<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: $secondary-bg;
    padding: 16px;
    border-radius: 16px;
    width: 100%;
    overflow: hidden;
    position: relative;
    isolation: isolate;
    border: 1px solid $tetriary-bg;
    @include lg(true) {
        max-width: 100%;
    }
}
</style>
