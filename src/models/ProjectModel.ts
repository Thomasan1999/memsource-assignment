import Model from '@/models/Model';

export default class ProjectModel extends Model
{
    public readonly name!: string;
    public readonly sourceLanguage!: string;
    public readonly status!: 'NEW' | 'COMPLETED' | 'DELIVERED';
    public readonly targetLanguages!: string[];

    constructor(attrs)
    {
        super();
        this.set(attrs);
    }
}
