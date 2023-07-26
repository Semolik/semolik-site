<template>
    <a
        class="activity-item"
        :href="itemData.url"
        target="_blank"
        rel="noreferrer noopener"
    >
        <div class="commit-info">
            <div class="repo-name">
                {{ itemData.repo }}
            </div>
            <div class="commit-message">
                <div class="message-text">
                    {{ itemData.commit }}
                </div>
                <div class="message-date">
                    {{ displayedDate }}
                </div>
            </div>
        </div>
        <Icon name="material-symbols:arrow-forward-rounded" />
    </a>
</template>
<script setup>
const { itemData } = defineProps({
    itemData: {
        type: Object,
        required: true,
    },
});
const currentDate = inject("currentDate");
const commitDate = new Date(itemData.date);
const diff = currentDate.getTime() - commitDate.getTime();
const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const displayedDate = computed(() => {
    if (days < 2) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours === 0) {
            const minutes = Math.floor(diff / (1000 * 60));
            if (minutes === 0) {
                return "Только что";
            }
            return `${minutes} ${usePluralize(minutes, [
                "минуту",
                "минуты",
                "минут",
            ])} назад`;
        }
        return `${hours} ${usePluralize(hours, [
            "час",
            "часа",
            "часов",
        ])} назад`;
    }
    return `${days} ${usePluralize(days, ["день", "дня", "дней"])} назад`;
});
</script>

<style lang="scss" scoped>
.activity-item {
    background-color: $tetriary-bg;
    padding: 10px;
    border-radius: 6px;
    display: grid;
    grid-template-columns: 1fr 20px;
    gap: 10px;

    &:hover {
        background-color: $quaternary-bg;
    }
    .commit-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-overflow: ellipsis;
        overflow: hidden;
        .repo-name {
            font-size: 0.85rem;
            color: $text-color-secondary;
        }

        .commit-message {
            font-size: 0.9rem;
            display: flex;
            gap: 5px;
            align-items: baseline;
            justify-content: space-between;
            text-overflow: ellipsis;

            .message-text {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .message-date {
                font-size: 0.8rem;
                color: $text-color-secondary;
                white-space: nowrap;
            }
        }
    }
    svg {
        width: 20px;
        height: 20px;
        color: $text-color-secondary;
        margin-block: auto;
    }
}
</style>
