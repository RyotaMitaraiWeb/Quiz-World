export interface LogActivity {
  message: string;
  date: string;
}

export type IndexedLogActivity = {
  index: number;
} & LogActivity;

export interface LogsList {
  total: number;
  logs: LogActivity[];
}

export interface IndexedLogsList {
  total: number;
  logs: IndexedLogActivity[];
}
