<template lang="pug">
th.table-header(
    :class="{sortable}"
    @click="onClick"
)
    div.table-header-content
        | {{label}}
        div.table-header-sort-icon(
            v-if="sortable"
            :style="{opacity: sortingBy ? '1' : '0'}"
        ) {{sortOrder === 1 ? '▼' : '▲'}}
</template>

<script lang="ts" setup>
import type {SortOrder} from '@/types';

const props = withDefaults(
    defineProps<{label: string, sortable?: boolean, sortingBy: boolean, sortOrder: SortOrder}>(),
    {sortable: false}
);

const emit = defineEmits(['click', 'sort']);

const onClick = () =>
{
    emit('click');

    if (props.sortable)
    {
        emit('sort');
    }
};
</script>

<style lang="scss" scoped>
.table-header
{
    &.sortable
    {
        cursor: pointer;

        .table-header-content
        {
            padding-left: 1em;
        }
    }
}

.table-header-content
{
    align-items: center;
    box-sizing: border-box;
    display: flex;
    height: var(--table-cell-min-height);
    justify-content: center;
    padding: var(--table-cell-link-padding);
    user-select: none;
}
</style>
