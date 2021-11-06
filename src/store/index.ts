import {defineStore} from 'pinia';
import {ProjectGetData, ProjectModelFormData, ProjectPostData} from '@/types/project';
import axios from 'axios';
import ProjectModel from '@/models/ProjectModel';
import {cloneDeep} from 'lodash';
import {ModelRaw} from '@/models/Model';
import {ApiResponseData} from '@/types';

const useStore = defineStore('main', {
    state()
    {
        return {
            idCounter: {} as Record<string, number>,
            initialized: false,
            projects: [] as ProjectModel[],
            projectsUrl: '/projects'
        };
    },
    actions: {
        async addProject(formData: ProjectModelFormData): Promise<ProjectModel>
        {
            const dataToSend = {
                ...formData,
                status: 'NEW' as ProjectModel['status']
            };

            const res = await axios.post<ProjectPostData>(this.projectsUrl, dataToSend);

            const resDataParsed = this.makeResponseDataStorable(res.data);

            const projectModel = new ProjectModel(resDataParsed);

            this.projects.push(projectModel);

            return projectModel;
        },
        async deleteProject(projectToDelete: ProjectModel): Promise<void>
        {
            await axios.delete(this.getProjectUrl(projectToDelete));

            this.projects = this.projects.filter((project) => project.id !== projectToDelete.id);
        },
        getProjectUrl(project: ProjectModel): string
        {
            return `${this.projectsUrl}/${project.id}`;
        },
        async fetchProjects(): Promise<void>
        {
            const res = await axios.get<ProjectGetData>(this.projectsUrl);

            this.projects = res.data._embedded.projects.map((project) => new ProjectModel(project));
        },
        incrementIdCounter(counterName: string): void
        {
            this.idCounter[counterName] ??= 0;
            this.idCounter[counterName]++;
        },
        async init(): Promise<void>
        {
            if (this.initialized)
            {
                throw new Error('State has been already initialized');
            }

            await this.fetchProjects();
        },
        makeResponseDataStorable(resData: ApiResponseData): ModelRaw
        {
            const resDataCopy: any = cloneDeep(resData);

            delete resDataCopy._links;

            return resDataCopy;
        },
        async saveProject(projectToSave: ProjectModel, formData: ProjectModelFormData): Promise<ProjectModel>
        {
            const res = await axios.patch<ProjectPostData>(this.getProjectUrl(projectToSave), formData);

            const projectModel = this.projects.find((project) => project.id === res.data.id)! as ProjectModel;

            const resDataParsed = this.makeResponseDataStorable(res.data);

            projectModel.set(resDataParsed);

            return projectModel;
        }
    }
});

export default useStore;
