<template lang="pug">
div.select-component
    label.select-component-label(:for="htmlId") {{label}}:
    select.select-component-select(
        :id="htmlId"
        :name="name"
        :required="required"
        @change="onInput($event.target.value)"
    )
        option(
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        ) {{option.label}}
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import useStore from '@/store';

const store = useStore();

withDefaults(
    defineProps<{
        label: string,
        modelValue: string,
        name: string,
        options: {label: string, value: string}[],
        required?: boolean
    }>(),
    {required: false}
);

const emit = defineEmits(['update:modelValue']);

const onInput = (value: string): void =>
{
    emit('update:modelValue', value);
};

const htmlId = ref(`select-component-${store.idCounter.selectComponent}`);

store.incrementIdCounter('selectComponent');
</script>

<style lang="scss" scoped>
.select-component
{
    display: flex;
}

.select-component-select
{
    flex-grow: 1;
}
</style>
