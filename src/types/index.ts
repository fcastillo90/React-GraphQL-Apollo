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

export interface QueryResponse {
  data: Datum[]
}