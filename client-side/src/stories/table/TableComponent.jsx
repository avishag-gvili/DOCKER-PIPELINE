import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types'
import './TableComponent.scss';

const TableComponent = ({ dataObject, widthOfTable = "80%" }) => {
  let columns = dataObject.headers.map((header) => ({
    field: header,
    headerName: header,
    width: 150,
  }));

  return (
    <div className="table" style={{ width: widthOfTable }}>
      <DataGrid 
        rows={dataObject.rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
         
      />
    </div>
  );
}

TableComponent.propTypes = {
  dataObject: PropTypes.shape({}).isRequired,
  widthOfTable: PropTypes.string,
};

export default TableComponent;

