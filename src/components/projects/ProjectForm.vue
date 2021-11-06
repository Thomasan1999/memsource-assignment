<template lang="pug">
form.project-form(@submit.prevent="$emit('submit', formModel)")
    div.project-form-upper-row
        router-link.big-button.project-form-upper-button.project-form-back(:to="{name: 'Projects'}") {{$t('goBack')}}
        h2.project-form-heading {{heading}}
        button.project-form-upper-button.project-form-clear-button.big-button(
            type="button"
            @click="$emit('clear')"
        ) {{clearButtonText}}
    div.project-form-input-container
        input-component(
            v-for="prop in ['name', 'sourceLanguage']"
            :label="$t(`project.${prop}`)"
            :name="prop"
            required
            type="text"
            v-model="formModel[prop]"
        )
        input-component(
            :label="$t('project.targetLanguages')"
            name="targetLanguages[]"
            v-model="formModel.targetLanguages"
        )
    div.project-form-bottom-row
        button.project-form-submit-button.big-button {{submitButtonText}}
</template>

<script lang="ts" setup>
import InputComponent from '@/components/InputComponent.vue';
import type {ProjectModelFormData} from '@/types/project';

defineProps<{clearButtonText: string, formModel: ProjectModelFormData, heading: string, submitButtonText: string}>();

defineEmits(['clear', 'submit']);
</script>

<style lang="scss" scoped>
.project-form
{
    display: flex;
    flex-direction: column;
    max-width: 700px;
    width: 100%;

    :deep(.input-component)
    {
        display: flex;
        justify-content: space-between;

        .input-component-label
        {
            width: 200px;
        }

        .input-container
        {
            flex-grow: 1;
        }
    }
}

.project-form-heading
{
    align-self: flex-end;
    line-height: var(--big-button-height);
}

.project-form-input-container
{
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.project-form-upper-row
{
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    position: relative;

    @media (max-width: 549px)
    {
        height: calc(var(--line-height) * 4);
    }
}

.project-form-upper-button
{
    position: absolute;
    top: 0;
}

.project-form-back
{
    left: 0;
}

.project-form-clear-button
{
    right: 0;
}

.project-form-bottom-row
{
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
</style>
