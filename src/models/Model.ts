import {DataType, ExtractPropertyNames, PartialRecord} from '@/types';
import {Merge} from 'ts-essentials';
import dayjs, {Dayjs} from 'dayjs';

export type ModelRaw<T extends Model = Model> = Merge<
    T,
    {[s in ExtractPropertyNames<T, Dayjs | null>]: string | null}
>;

export default class Model
{
    public readonly id!: number;
    public readonly dateCreated!: Dayjs | null;
    public readonly dateDue!: Dayjs | null;
    public readonly dateUpdated!: Dayjs | null;

    public set(attrs: Record<keyof Model, any>): void
    {
        Object.entries(attrs).forEach(([key, value]) =>
        {
            this[key] = this.transforms[key] ? this.transformValue(key, value) : value;
        });
    }

    protected get transforms(): PartialRecord<keyof Model, DataType>
    {
        return {
            dateCreated: 'date',
            dateDue: 'date',
            dateUpdated: 'date'
        };
    }

    private transformValue(key: string, value: any): any
    {
        if (value === null || value === undefined)
        {
            return value;
        }

        switch (this.transforms[key] as DataType)
        {
            case 'date':
                return dayjs(value);
        }
    }
}
