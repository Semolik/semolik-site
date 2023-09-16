<template>
    <Card
        v-if="activity"
        icon="ic:baseline-discord"
        :largeImage="activity?.assets?.largeImage"
        :largeText="activity?.assets?.largeText"
        :smallImage="activity.assets?.smallImage"
        :smallText="activity.assets?.smallText"
        :name="activity.name"
        :details="details"
        head-text="Активность в Discord"
    >
    </Card>
</template>
<script setup>
const { data: activity } = await useFetch("/api/discord");

const startTime = computed(() => {
    if (!activity.value?.timestamps?.start) return null;
    return new Date(activity.value.timestamps.start);
});
const timerText = ref("");
const details = computed(() => {
    if (!activity.value) return [];
    return [
        activity.value.details,
        activity.value.state,
        timerText.value,
    ].filter(Boolean);
});
const getTimerText = () => {
    if (!startTime.value) return "";
    const diff = new Date() - startTime.value;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const hoursText = hours.toString().padStart(2, "0");
    const minutesText = minutes.toString().padStart(2, "0");
    const secondsText = seconds.toString().padStart(2, "0");
    return `Прошло ${hoursText}:${minutesText}:${secondsText}`;
};

const setTimerText = () => {
    timerText.value = getTimerText();
};
onMounted(() => {
    setTimerText();
    setInterval(setTimerText, 1000);
    setInterval(async () => {
        const { data } = await useFetch("/api/discord");
        activity.value = data.value;
    }, 30 * 1000);
});
</script>
