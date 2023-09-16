<template>
    <div class="card-head">
        <div class="head-text">
            {{ headText }}
        </div>
        <div class="card-icon" v-if="props.icon">
            <Icon :name="props.icon" />
        </div>
    </div>
    <img alt="" class="bg" v-if="largeImage && bg" :src="largeImage" />
    <div class="card-content">
        <div class="assets">
            <img
                :src="largeImage"
                :alt="largeText"
                class="large-image"
                :title="largeText"
                v-if="largeImage"
            />
            <div class="large-image icon" v-else>
                <Icon :name="props.icon" />
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
            <div class="name ellipsis" v-if="name">
                {{ name }}
            </div>
            <div class="details ellipsis" v-for="detail in details">
                {{ detail }}
            </div>
            <div class="details">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    imageSize: {
        type: Number,
        default: 90,
    },
    icon: {
        type: String,
        default: null,
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
    headText: {
        type: String,
        required: false,
    },
    bg: {
        type: Boolean,
        default: false,
    },
});
const imageSizePx = computed(() => props.imageSize + "px");
</script>
<style lang="scss" scoped>
.bg {
    position: absolute;
    inset: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: blur(10px) brightness(0.4);
    z-index: -1;
    transition: filter 0.3s ease;
}
.card-head {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .card-icon {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        color: $text-color-secondary;

        svg {
            width: 100%;
            height: 100%;
        }
    }

    .head-text {
        color: $text-color-secondary;
    }
}

.card-content {
    display: flex;
    gap: 10px;

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
