<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },

    color: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div
        :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color,
            fontSize: '35px',
            borderRadius: '50px',
            padding: '10px 20px',
            width: '200px',
            height: '200px',
        }"
    >
        {{ title }}
    </div>
</template>
