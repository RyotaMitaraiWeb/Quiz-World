export type LogActivity = {
  message: string;
  date: string;
}

export type IndexedLogActivity = {
  index: number;
} & LogActivity;

export type LogsList = {
  total: number;
  logs: LogActivity[];
}