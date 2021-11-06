import {createRouter, createWebHistory} from 'vue-router';
import ProjectCreate from '@/components/projects/ProjectCreate.vue';
import ProjectEdit from '@/components/projects/ProjectEdit.vue';
import Projects from '@/components/projects/Projects.vue';
import App from '@/App.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/projects',
            component: App,
            children: [
                {
                    path: 'create',
                    name: 'ProjectCreate',
                    component: ProjectCreate
                },
                {
                    path: ':id',
                    name: 'ProjectEdit',
                    component: ProjectEdit
                },
                {
                    path: '',
                    name: 'Projects',
                    component: Projects
                }
            ]
        },
        {
            path: '/',
            redirect: '/projects'
        }
    ]
});

export default router;
