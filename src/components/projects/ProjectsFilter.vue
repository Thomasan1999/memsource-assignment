<template lang="pug">
form.projects-filter(@submit.prevent)
    h2.projects-filter-heading Filter by
    div.projects-filter-input-container
        input-component.projects-filter-form-component(
            :label="$t('project.name')"
            :model-value="name"
            name="name"
            @input="$emit(`update:name`, $event.target.value)"
        )
        select-component.projects-filter-form-component(
            :label="$t('project.status')"
            :model-value="status"
            name="status"
            :options="statusOptions"
            @input="$emit(`update:status`, $event.target.value)"
        )
</template>

<script lang="ts" setup>
import InputComponent from '@/components/InputComponent.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import {reactive} from 'vue';

defineProps<{name: string, status: string}>();

defineEmits(['update:name', 'update:status']);

const statusOptions = reactive([
    {
        label: '',
        value: ''
    },
    {
        label: 'COMPLETED',
        value: 'COMPLETED'
    },
    {
        label: 'DELIVERED',
        value: 'DELIVERED'
    },
    {
        label: 'FINISHED',
        value: 'FINISHED'
    },
    {
        label: 'NEW',
        value: 'NEW'
    }
]);
</script>

<style lang="scss" scoped>
.projects-filter
{
    justify-content: center;
    text-align: center;
}

.projects-filter-input-container
{
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
}

.projects-filter-form-component
{
    --label-width: 100px;

    gap: 10px;
    margin-left: calc(var(--label-width) * -1);

    :deep(.input-component-label), :deep(.select-component-label)
    {
        width: var(--label-width);
    }

    :deep(input), :deep(input)
    {
        width: 300px;
    }
}
</style>
