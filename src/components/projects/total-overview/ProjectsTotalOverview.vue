<template lang="pug">
div.projects-total-overview(v-if="store.projects")
    h2 {{$t('totalOverview.heading')}}
    div.projects-total-overview-item-container
        projects-total-overview-item(
            :label="$t('totalOverview.dueDateInPast')"
            :value="projectsByStatus"
            v-slot="{item}"
        )
            div.projects-total-overview-projects-by-status-label {{item.status}}:{{' '}}
            div {{item.value}}
        projects-total-overview-item(:label="$t('totalOverview.dueDateInPast')" :value="dueDateInPast")
        projects-total-overview-item(:label="$t('totalOverview.mostProminent')" :value="mostProminent")
</template>

<script lang="ts" setup>
import useStore from '@/store';
import {computed} from 'vue';
import dayjs from 'dayjs';
import ProjectModel from '@/models/ProjectModel';
import ProjectsTotalOverviewItem from '@/components/projects/total-overview/ProjectsTotalOverviewItem.vue';

const store = useStore();

const dueDateInPast = computed(() => (
    store.projects.filter((project) => project.dateDue && project.dateDue.isBefore(dayjs())).length
));

const mostProminent = computed(() =>
{
    const projectsGroupedBySource = store.projects.reduce((acc, project) =>
    {
        acc[project.sourceLanguage] ??= 0;
        acc[project.sourceLanguage]++;

        return acc;
    }, {} as Record<string, number>);

    const mostProminentLanguages = [] as string[];

    const languagesSorted = Object.entries(projectsGroupedBySource).sort(([languageA, valueA], [languageB, valueB]) =>
    {
        if (valueA !== valueB)
        {
            return valueB - valueA;
        }

        return languageA.localeCompare(languageB);
    });

    let maxValue = -1;

    languagesSorted.forEach(([language, value]) =>
    {
        if (maxValue === -1)
        {
            maxValue = value;
        }

        if (value === maxValue)
        {
            mostProminentLanguages.push(language);
        }
    });

    return mostProminentLanguages.join(', ');
});

const projectsByStatus = computed(() =>
{
    const groupedProjectsObject = store.projects.reduce((acc, project) =>
    {
        acc[project.status] ??= 0;
        acc[project.status]++;

        return acc;
    }, {COMPLETED: 0, DELIVERED: 0, FINISHED: 0, NEW: 0} as Record<ProjectModel['status'], number>);

    return Object.entries(groupedProjectsObject).map(([status, value]) =>
    {
        return {status, value};
    });
});
</script>

<style lang="scss" scoped>
.projects-total-overview-projects-by-status-label
{
    width: 100px;
}
</style>
