<template>
    <div class="app-layout">
        <Header />
        <div class="app-content">
            <div id="activities"></div>

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
    $padding: 10px;
    .app-content {
        max-width: 1200px;
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: $padding;
        position: relative;
    }
}
</style>
