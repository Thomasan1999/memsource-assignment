<template lang="pug">
div.input-component
    label.input-component-label(:for="htmlId") {{label}}:
    div.input-component-content
        div.input-component-input-container(
            v-for="(value, index) in typeof modelValue === 'string' ? [modelValue] : modelValue"
        )
            input.input-component-input(
                :id="htmlId"
                :name="name"
                :required="required"
                :type="type"
                :value="value"
                @input="onInput($event.target.value, index)"
            )
            button.input-component-delete-button.small-button(
                v-if="!isString"
                :title="$t('form.deleteInput')"
                type="button"
                @click="deleteInput(index)"
            ) X
        button.input-component-add-button.small-button(v-if="!isString" type="button" @click="addInput") {{$t('add')}}
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import useStore from '@/store';

const store = useStore();

const props = withDefaults(
    defineProps<{label: string, modelValue: string | string[], name: string, required?: boolean, type?: string}>(),
    {required: false, type: 'text'}
);

const emit = defineEmits(['update:modelValue']);

const addInput = (): void =>
{
    emit('update:modelValue', [...props.modelValue, '']);
};

const deleteInput = (index: number): void =>
{
    const modelValueCopy = [...props.modelValue];

    modelValueCopy.splice(index, 1);

    emit('update:modelValue', modelValueCopy);
};

const onInput = (value: string, index: number): void =>
{
    if (isString.value)
    {
        emit('update:modelValue', value);
        return;
    }

    const newValue = [
        ...props.modelValue.slice(0, index),
        value,
        ...props.modelValue.slice(index + 1)
    ];

    emit('update:modelValue', newValue);
};

const htmlId = ref(`input-component-${store.idCounter.inputComponent}`);

store.incrementIdCounter('inputComponent');

const isString = computed(() => typeof props.modelValue === 'string');
</script>

<style lang="scss" scoped>
.input-component
{
    display: flex;
}

.input-component-content
{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.input-component-input-container
{
    display: flex;
    position: relative;
    width: 100%;

    &:not(:first-child)
    {
        .input-component-input
        {
            border-top: 0;
        }
    }
}

.input-component-input
{
    flex-grow: 1;
}

.input-component-add-button
{
    flex-basis: var(--line-height);

    &:not(:first-child)
    {
        border-top: 0;
    }
}

.input-component-delete-button
{
    border: 0;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
}
</style>
