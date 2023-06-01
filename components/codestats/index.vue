<template>
    <ClientOnly>
        <CodestatsTestchart :data="data" />
    </ClientOnly>
</template>
<script setup>
const { data } = await useFetch("/api/codestats");
</script>
