<template>
    <Card
        v-if="activity"
        :largeImage="activity?.assets?.largeImage"
        :largeText="activity?.assets?.largeText"
        icon="ic:baseline-discord"
        :smallImage="activity.assets?.smallImage"
        :name="activity.name"
        :details="details"
        :smallText="activity.assets?.smallText"
        discord
    >
        <template #details>
            <div class="details ellipsis" v-if="timerText">
                Прошло {{ timerText }}
            </div>
        </template>
    </Card>
</template>
<script setup>
const { data: activity } = await useFetch("/api/discord");
const details = computed(() => {
    if (!activity.value) return [];
    return [activity.value.details, activity.value.state].filter(Boolean);
});
const startTime = computed(() => {
    if (!activity.value?.timestamps?.start) return null;
    return new Date(activity.value.timestamps.start);
});
const timerText = ref("");
const timer = ref(null);
const getTimerText = () => {
    if (!startTime.value) return "";
    const diff = new Date() - startTime.value;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const hoursText = hours.toString().padStart(2, "0");
    const minutesText = minutes.toString().padStart(2, "0");
    const secondsText = seconds.toString().padStart(2, "0");
    return `${hoursText}:${minutesText}:${secondsText}`;
};
watch(
    activity,
    () => {
        if (timer.value) clearInterval(timer.value);
        if (!startTime.value) return;
        timerText.value = getTimerText();
        timer.value = setInterval(() => {
            timerText.value = getTimerText();
        }, 1000);
    },
    { immediate: true }
);
onMounted(() => {
    setInterval(async () => {
        const { data: newActivity } = await useFetch("/api/discord");
        activity.value = newActivity.value;
    }, 30 * 1000);
});
</script>
