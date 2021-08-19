import { JobCategories } from './job-category.enum';

export interface IJob {
  id: string;
  title: string;
  description: string;
  datePublished: number;
  requirements: string;
  isSaved?: boolean;
  didApply?: boolean;
  salary: string | number;
  area: string;
  companyName: string;
  companyImageUrl: string;
  companyId: string;
  imageUrl: string;
  category: JobCategories | string;
  hot: boolean;
  forStudents: boolean;
  uploadingUserId?: string;
}
