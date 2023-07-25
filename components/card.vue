<template>
    <div class="card">
        <div class="discord-icon" v-if="discord" title="Discord">
            <Icon name="ic:baseline-discord" />
        </div>
        <div class="assets">
            <img
                :src="largeImage"
                :alt="largeText"
                class="large-image"
                :title="largeText"
                v-if="largeImage"
            />
            <div class="large-image icon" v-else>
                <Icon name="ic:baseline-discord" />
            </div>
            <img
                :src="smallImage"
                :alt="smallText"
                class="small-image"
                :title="smallText"
                v-if="smallImage"
            />
        </div>
        <div class="info">
            <slot name="before" />
            <div class="name ellipsis" v-if="name">
                {{ name }}
            </div>
            <div class="details ellipsis" v-for="detail in details">
                {{ detail }}
            </div>
            <div class="details">
                <slot name="details"></slot>
            </div>
            <slot name="after" />
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    imageSize: {
        type: Number,
        default: 80,
    },

    largeImage: [String, null],
    largeText: [String, null],

    smallImage: {
        type: String,
        default: null,
        required: false,
    },
    smallText: {
        type: String,
        default: null,
        required: false,
    },
    name: {
        type: String,
        default: null,
    },
    details: Array,

    discord: {
        type: Boolean,
        default: false,
    },
});
const imageSizePx = computed(() => props.imageSize + "px");
</script>
<style lang="scss" scoped>
.card {
    display: grid;
    $image-size: v-bind(imageSizePx);
    grid-template-columns: $image-size 1fr;
    gap: 10px;
    background-color: $secondary-bg;
    padding: 10px;
    border-radius: 16px;
    max-width: 350px;
    width: 100%;
    position: relative;
    height: min-content;
    @include lg(true) {
        max-width: 100%;
    }
    .discord-icon {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 10px;
        right: 15px;
        color: $text-color-tertiary;

        svg {
            width: 100%;
            height: 100%;
        }
    }

    .assets {
        position: relative;
        display: flex;
        width: v-bind(imageSizePx);
        height: v-bind(imageSizePx);
        .large-image {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            object-fit: cover;
            background-color: $tetriary-bg;
            &.icon {
                display: flex;
                justify-content: center;
                align-items: center;

                border-radius: 8px;
                svg {
                    width: 50%;
                    height: 50%;
                    color: $text-color;
                }
            }
        }
        .small-image {
            border-radius: 50%;
            position: absolute;
            bottom: -8px;
            right: -8px;
            width: 25px;
            height: 25px;
            object-fit: cover;
        }
    }
    .info {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        justify-content: center;
        .name {
            font-weight: bold;
            font-size: 0.9rem;

            span.marque-text {
                margin-right: 10px;
            }
        }
        .ellipsis {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .details {
            font-size: 0.9rem;
            color: $text-color-secondary;
        }
    }
}
</style>
