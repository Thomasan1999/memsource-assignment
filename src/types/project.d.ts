import ProjectModel from '@/models/ProjectModel';
import {ModelRaw} from '@/models/Model';
import {ApiResponseData} from '@/types/index';

export type ProjectModelFormData = Pick<ProjectModel, 'name' | 'sourceLanguage' | 'targetLanguages'>;

export type ProjectGetData = ApiResponseData<{
    _embedded: {projects: ModelRaw<ProjectModel>[]}
}>;

export type ProjectPostData = ApiResponseData<ModelRaw<ProjectModel>>;
