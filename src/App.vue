<template lang="pug">
router-view.main-view
</template>

<script lang="ts" setup>
import useStore from '@/store';
import {onBeforeMount} from 'vue';

const store = useStore();

onBeforeMount(async () =>
{
    await store.init();
});
</script>

<style lang="scss">
@import 'styles/reset';
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

#app
{
    --base-transition: all .25s;
    --big-button-height: calc(var(--line-height) + var(--big-button-padding-vertical) * 2);
    --big-button-padding-horizontal: 20px;
    --big-button-padding-vertical: 10px;
    --line-height: 24px;
    --success-color: #009944;
    --table-cell-link-padding: 5px;
    --table-cell-min-height: calc(var(--line-height) + (var(--table-cell-link-padding) * 2));
    --thin-border: 1px solid #000000;

    font-family: 'Roboto', sans-serif;
    line-height: var(--line-height);
}

.main-view
{
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    max-width: 1100px;
    padding: 40px 15px;
    width: 100%;
}

h2
{
    font-size: 2em;
}

input, select
{
    background-color: transparent;
    border: var(--thin-border);
}

button
{
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
}

a, button, input, select
{
    box-sizing: border-box;
    color: inherit;
    font: inherit;
}

a
{
    align-items: center;
    background-color: transparent;
    display: flex;
    justify-content: center;
    text-decoration: none;
}

.small-button
{
    height: var(--line-height);
}

.big-button
{
    height: var(--big-button-height);
    padding-left: var(--big-button-padding-horizontal);
    padding-right: var(--big-button-padding-horizontal);
}

button, .big-button
{
    background-color: transparent;
    border: var(--thin-border);
    transition: var(--base-transition);

    &:hover
    {
        background-color: #000000;
        color: #ffffff;
    }
}
</style>
