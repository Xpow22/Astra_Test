import { useState } from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { TableService } from '@/service/table';
import { TableMainData } from '@/types/table';

const index = () => {
  const [rows, setRows] = useState<TableMainData[]>([]);


  const handleRowClick = (params: any) => {
    alert(`Name: ${params.row.name}\nWebsite: ${params.row.web_pages.join(', ')}`);
  };


  const query = useQuery({
    queryKey: ['search?country=Indonesia'], queryFn: TableService.getList, onSuccess: (data: any) => {
      if (data)
        setRows(data.data)
      console.log(data)
    }
  })

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 400,
      renderCell: (params) => (
        <div
          onClick={() => handleRowClick(params)}
          style={{ cursor: 'pointer' }}
        >
          {params.value}
        </div>
      ),
    },
    { field: 'web_pages', headerName: 'Website', width: 250 },
  ];

  return (
    <>
      <div className=" w-screen h-full">
        <div className=" h-full w-full bg-white">
          <div className="p-5 text-white flex flex-row justify-between ">
            <h1 className="font-semibold text-lg text-black underline underline-offset-8">
              My Table
            </h1>
          </div>
          <div style={{ width: '100%' }}>
            <DataGrid
              className=' w-full'
              getRowId={(row) => row.name}
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </div>

      </div>

    </>
  );
};

export default index;
