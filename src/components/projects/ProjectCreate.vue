<template lang="pug">
div.project-create
    project-form(
        :clear-button-text="$t('project.actions.reset')"
        :heading="$t('project.actions.add')"
        :form-model="formModel"
        :submit-button-text="$t('form.submit.add')"
        @clear="resetForm"
        @submit="addProject"
    )
</template>

<script lang="ts" setup>
import ProjectForm from '@/components/projects/ProjectForm.vue';
import useStore from '@/store';
import type {ProjectModelFormData} from '@/types/project';
import {reactive} from 'vue';
import router from '@/router';

const store = useStore();

const addProject = async (formData: ProjectModelFormData): Promise<void> =>
{
    const addedProject = await store.addProject(formData);

    await router.push({name: 'ProjectEdit', params: {id: addedProject.id}});
};

const resetForm = () =>
{
    formModel.name = '';
    formModel.sourceLanguage = '';
    formModel.targetLanguages = [];
};

const formModel = reactive({
    name: '',
    sourceLanguage: '',
    targetLanguages: ['']
});
</script>

<style lang="scss" scoped>
</style>
