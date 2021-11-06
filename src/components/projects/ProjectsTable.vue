<template lang="pug">
table.projects-table
    tr.projects-row.projects-header-row
        table-header.projects-cell.projects-header(
            v-for="column in columns"
            :key="column.name"
            :label="$t(`project.${column.name}`)"
            :sortable="column.sortable"
            :sorting-by="column.name === sortBy.column"
            :sort-order="sortBy.order"
            @sort="setSortBy(column.name)"
        )
    tr.projects-data-row.projects-row(
        v-for="project in sortedProjects"
        :key="project.id"
    )
        td.projects-data.projects-cell(v-for="column in columns")
            router-link.projects-cell-link(
                :to="{name: 'ProjectEdit', params: {id: project.id}}"
            ) {{getCellValue(project, column) || '&nbsp;'}}
</template>

<script lang="ts" setup>
import TableHeader from '@/components/TableHeader.vue';
import {computed, reactive} from 'vue';
import type {SortOrder, TableColumn} from '@/types';
import ProjectModel from '@/models/ProjectModel';
import {Dayjs} from 'dayjs';

const props = defineProps<{projects: ProjectModel[]}>();

const formatDate = (date: Dayjs | null): string => date ? date.format('DD.MM.YYYY HH:mm:ss') : '';

const getCellValue = (project: ProjectModel, column: TableColumn): string =>
{
    switch (column.type)
    {
        case 'date':
            return formatDate(project[column.name]);
        case 'string[]':
            return project[column.name].join(', ');
        default:
            return project[column.name]?.toString();
    }
};

const getSortDiff = (valueA: any, valueB: any, sortingDataType: DataType): number =>
{
    switch (sortingDataType)
    {
        case 'date':
            return (valueA ?? -1) - (valueB ?? -1);
        case 'string':
            return (valueA as string).localeCompare(valueB);
        default:
            return valueA - valueB;
    }
};

const setSortBy = (columnName: string) =>
{
    const columnUnchanged = columnName === sortBy.column;

    sortBy.column = columnName;
    sortBy.order = columnUnchanged ? (sortBy.order * -1 as SortOrder) : 1;
};

const columns = computed<TableColumn[]>(() => [
    {name: 'id', sortable: true, type: 'number'},
    {name: 'name', sortable: true, type: 'string'},
    {name: 'status', sortable: true, type: 'string'},
    {name: 'sourceLanguage', type: 'string'},
    {name: 'targetLanguages', type: 'string[]'},
    {name: 'dateDue', sortable: true, type: 'date'}
]);

const sortedProjects = computed(() =>
{
    const {projects} = props;

    if (!projects.length || !sortBy.column)
    {
        return projects;
    }

    /** Copy used to prevent altering the prop. */
    const projectsCopy = [...projects];

    const sortingColumn = columns.value.find((column) => column.name === sortBy.column)!;

    return projectsCopy.sort((projectA, projectB) =>
    {
        const columnA = projectA[sortBy.column];
        const columnB = projectB[sortBy.column];

        const diff = getSortDiff(columnA, columnB, sortingColumn.type);

        return diff * sortBy.order;
    });
});

const sortBy = reactive<{column: string, order: SortOrder}>({column: '', order: 1});
</script>

<style lang="scss" scoped>
.projects-table
{
    --table-border: var(--thin-border);

    margin: auto;
}

.projects-row
{
    &:last-child
    {
        border-bottom: var(--table-border);
    }
}

.projects-data-row
{
    transition: var(--base-transition);

    &:hover
    {
        background-color: #cccccc;
    }
}

.projects-header :deep(.table-header-content), .projects-cell-link
{
    border-left: var(--table-border);
    border-top: var(--table-border);
}

.projects-header:last-child :deep(.table-header-content), .projects-cell:last-child .projects-cell-link
{
    border-right: var(--table-border);
}

.projects-cell
{
    height: var(--table-cell-min-height);
    white-space: pre;
}

.projects-cell-link
{
    height: var(--table-cell-min-height);
    padding: var(--table-cell-link-padding);
}
</style>
