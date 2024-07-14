<template>
    <a
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        v-if="!copy"
        class="link"
    >
        <Icon :name="icon" />
    </a>
    <div v-else @click="copyText" :class="['link copy', { copied }]">
        <Icon :name="icon" />
        <div class="copied-text">Скопировано</div>
    </div>
</template>
<script setup>
import copyToClipboard from "copy-to-clipboard";
const { link } = defineProps({
    link: String,
    icon: String,
    copy: Boolean,
});
const copied = ref(false);
const copyText = () => {
    copyToClipboard(link);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 1000);
};
</script>
<style scoped lang="scss">
.link {
    @include flex-center;
    background: $secondary-bg;
    border-radius: 16px;
    transition: 0.2s ease-in-out;
    border: 1px solid $tetriary-bg;

    svg {
        color: $text-color;
        height: 30%;
        width: 30%;
    }
    @include xs(true) {
        svg {
            height: auto;
            width: auto;
        }
    }
    @include sm(true) {
        min-height: 70px;
        svg {
            height: 40px;
            width: 40px;
        }
    }
    @include has-hover {
        background: $quaternary-bg;
    }

    &.copy {
        cursor: pointer;
        position: relative;
        padding: 0 8px;
        overflow: hidden;

        .copied-text {
            position: absolute;
            inset: 0;
            opacity: 0;
            @include flex-center;
            padding: 5px;
            transition: 0.2s ease-in-out;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);

            font-size: clamp(10px, 2.5vw, 16px);
        }

        &.copied {
            .copied-text {
                opacity: 1;
            }
        }

        &:hover {
            .copied {
                opacity: 1;
            }
        }
    }
}
</style>
