<template>
    <div class="app-layout">
        <Header />
        <div class="app-content">
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
        max-width: 1200px;
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }
}
</style>
