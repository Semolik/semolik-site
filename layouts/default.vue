<template>
    <div class="app-layout">
        <div class="app-content">
            <app-header />

            <slot />
        </div>
    </div>
</template>
<style lang="scss">
.app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    .app-content {
        max-width: $screen-md-min;
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
        padding-top: 10px;
        position: relative;
        gap: 10px;
    }
}
</style>
