<template lang="pug">
div.projects-total-overview-item(v-if="value")
    div.projects-total-overview-label {{label}}:{{' '}}
    div.projects-total-overview-value
        div.projects-total-overview-value-item(v-for="item in formattedValue")
            slot(v-bind="{item}")
                div {{item}}
</template>

<script lang="ts" setup>
import {computed} from 'vue';

const props = defineProps<{label: string, value: number | string | Record<string, any>[]}>();

const formattedValue = computed(() => props.value instanceof Array ? props.value : [props.value]);
</script>

<style lang="scss" scoped>
.projects-total-overview-item
{
    display: flex;
}

.projects-total-overview-label
{
    width: 300px;
}

.projects-total-overview-value-item
{
    display: flex;
}
</style>
