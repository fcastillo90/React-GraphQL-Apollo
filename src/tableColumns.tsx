import { Avatar } from "@mui/material"
import { GridRenderCellParams } from "@mui/x-data-grid";

export const keys = [
  "id",
  "first_name",
  "last_name",
  "email",
  "gender",
  "avatar",
  "company_name",
  "job_title",
  "language"
]

export const columns = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'avatar',
    headerName: 'Avatar',
    renderCell: (params: GridRenderCellParams<string>) => (
      <Avatar src={params.value} />
    ),
  },
  {
    field: 'first_name',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'last_name',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 150,
  },
  {
    field: 'company_name',
    headerName: 'Company name',
    width: 250,
  },
  {
    field: 'job_title',
    headerName: 'Job title',
    width: 250,
  },
  {
    field: 'language',
    headerName: 'Language',
    width: 200,
  },
];

export default columns
