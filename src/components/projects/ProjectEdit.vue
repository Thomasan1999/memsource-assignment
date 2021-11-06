<template lang="pug">
div.project-edit
    project-form(
        v-if="initialized"
        :clear-button-text="$t('project.actions.delete')"
        :form-model="formModel"
        :heading="$t('project.actions.edit')"
        :project="project"
        :submit-button-text="$t('form.submit.edit')"
        @clear="deleteProject"
        @submit="saveProject"
    )
    div.project-edit-message(v-if="saveSuccessful") {{$t('project.saveSuccessful')}}
</template>

<script lang="ts" setup>
import ProjectForm from '@/components/projects/ProjectForm.vue';
import {computed, reactive, ref, watch} from 'vue';
import useStore from '@/store';
import router from '@/router';
import ProjectModel from '@/models/ProjectModel';
import type {ProjectModelFormData} from '@/types/project';

const store = useStore();

const deleteProject = async (): Promise<void> =>
{
    await store.deleteProject(project.value as ProjectModel);

    await router.push({name: 'Projects'});
};

const saveProject = async (formData: ProjectModelFormData): Promise<void> =>
{
    await store.saveProject(project.value as ProjectModel, formData);

    saveSuccessful.value = true;
};

const project = computed(() => (
    store.projects.find((storedProject) => storedProject.id === projectId.value)
));

const projectId = computed(() => parseInt(router.currentRoute.value.params.id as string));

const formModel = reactive({
    name: '',
    sourceLanguage: '',
    targetLanguages: [] as string[]
});

const initialized = ref(false);

const saveSuccessful = ref(false);

watch(formModel, () => saveSuccessful.value = false);

watch(project, () =>
{
    if (initialized.value || !project.value)
    {
        return;
    }

    formModel.name = project.value.name;
    formModel.sourceLanguage = project.value.sourceLanguage;
    formModel.targetLanguages = [...project.value.targetLanguages];
    initialized.value = true;
}, {deep: true, immediate: true});
</script>

<style lang="scss" scoped>
.project-edit-message
{
    color: var(--success-color);
}
</style>
