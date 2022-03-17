export interface Datum {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  avatar?: string;
  company_name?: string;
  job_title?: string;
  language?: string;
}

export interface Data {
  list: Datum[];
  totalQuery: number;
}

export interface QueryResponse {
  data: Data;
  total: number;
}