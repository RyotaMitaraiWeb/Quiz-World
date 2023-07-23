export type order = 'asc' | 'desc';
export type sort = 'title' | 'createdOn' | 'updatedOn';

export interface IQuizListItem {
  id: number;
  title: string;
  description: string;
  instantMode: boolean;
  createdOn: string;
  updatedOn?: string;
}

export interface IQuizList {
  quizzes: IQuizListItem[];
  total: number;
}