<template>
    <div class="discord-activity">
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
            <div class="name ellipsis">
                {{ name }}
            </div>
            <div class="details ellipsis" v-for="detail in details">
                {{ detail }}
            </div>
            <div class="details">
                <slot name="details"></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
    largeImage: [String, null],
    largeText: [String, null],
    icon: {
        type: String,
        default: null,
        required: false,
    },
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
    name: String,
    details: Array,
});
</script>
<style lang="scss" scoped>
.discord-activity {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 10px;
    background-color: $secondary-bg;
    padding: 10px;
    border-radius: 16px;
    max-width: 350px;
    width: 100%;
    .assets {
        position: relative;
        display: flex;
        width: 80px;
        height: 80px;
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
        .name {
            font-weight: bold;

            font-size: 0.9rem;
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
