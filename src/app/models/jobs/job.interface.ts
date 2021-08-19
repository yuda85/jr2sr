import { JobCategories } from "./job-category.enum";

export interface IJob {
    id: string;
    title: string;
    description: string
    requirements: string
    isSaved?: boolean
    didApply?: boolean
    Salary: string
    area: string
    company: string;
    imageUrl: string;
    category: JobCategories
    hot: boolean
    forStudents: boolean
}
