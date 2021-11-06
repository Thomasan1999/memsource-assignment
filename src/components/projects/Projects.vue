<template lang="pug">
div.projects
    projects-total-overview.projects-section
    projects-filter.projects-section(v-model:name="filter.name" v-model:status="filter.status")
    div.projects-section
        div.projects-upper-row
            h2 {{$t('projects')}}
            router-link.projects-add.big-button(:to="{name: 'ProjectCreate'}") {{$t('project.actions.add')}}
        div.projects-table-container
            projects-table(:projects="filteredProjects")
</template>

<script lang="ts" setup>
import useStore from '@/store';
import ProjectsTable from '@/components/projects/ProjectsTable.vue';
import {computed, reactive} from 'vue';
import ProjectsFilter from '@/components/projects/ProjectsFilter.vue';
import ProjectsTotalOverview from '@/components/projects/total-overview/ProjectsTotalOverview.vue';

const store = useStore();

const filter = reactive({name: '', status: ''});

const filterProperty = (property: string, filterBy: string): boolean => (
    !property || Boolean(removeAccents(property?.toLowerCase()).includes(filterBy.toLowerCase()))
);

const removeAccents = (str: string): string => (
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
);

const filteredProjects = computed(() => (
    store.projects.filter((project) => (
        filterProperty(project.name, filter.name) && filterProperty(project.status, filter.status)
    ))
));
</script>

<style lang="scss" scoped>
.projects
{
    gap: 25px;

    & > *
    {
        width: 100%;
    }

    :deep(h2)
    {
        margin-bottom: 20px;
        text-align: center;
    }
}

.projects-section
{
    align-items: center;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.projects-upper-row
{
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
}

.projects-table-container
{
    overflow-x: auto;
    width: 100%;
}

.projects-add
{
    position: absolute;
    right: 0;
}
</style>
