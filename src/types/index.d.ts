import {Merge} from 'ts-essentials';
import {ModelRaw} from '@/models/Model';

export type ApiResponseData<T extends ModelRaw = ModelRaw> = Merge<T, {_links: ApiResponseLinks}>;

export type ApiResponseLinks = Record<string, {href: string}>;

export type DataType = 'boolean' | 'date' | 'number' | 'string' | 'string[]';

type ExtractPropertyNames<Object, Type> = {
    [K in keyof Object]: Object[K] extends Type ? K : never
}[keyof Object]

export type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

export type SortOrder = 1 | -1;

export type TableColumn = {name: string, sortable?: boolean, type: DataType};
