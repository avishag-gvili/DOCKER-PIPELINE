import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import './TableComponent.scss';

const TableComponent = ({ dataObject, widthOfTable = "80%", widthOfColums, actions, editRowId, handleFieldChange }) => {
  let columns = dataObject.headers.map((header, i) => ({
    field: header,
    headerName: header,
    width: widthOfColums[i],
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      if (editRowId && editRowId === params.row.id && header !== 'Actions') {
        return (
          <TextField
            value={params.value}
            onChange={(e) => handleFieldChange && handleFieldChange(e, params.row.id)}
            name={header}
          />
        );
      }
      if (header === 'Actions') {
        return (
          <div>
            {actions && actions.filter(action => action.condition(params.row.id)).map((action, index) => (
              <IconButton key={index} onClick={() => action.func(params.row.id)} aria-label={action.label}>
                {React.createElement(action.icon)}
              </IconButton>
            ))}
          </div>
        );
      }
      return params.value;
    },
  }));

  if (!columns.some(column => column.field === 'Actions')) {
    columns.push({
      field: 'Actions',
      headerName: 'Actions',
      width: widthOfColums[widthOfColums.length - 1],
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <div>
          {actions && actions.filter(action => action.condition(params.row.id)).map((action, index) => (
            <IconButton key={index} onClick={() => action.func(params.row.id)} aria-label={action.label}>
              {React.createElement(action.icon)}
            </IconButton>
          ))}
        </div>
      ),
    });
  }

  return (
    <div className="table" style={{ width: widthOfTable, marginTop: "8%" }}>
      <DataGrid
        rows={dataObject.rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[4, 8]}
      />
    </div>
  );
};

TableComponent.propTypes = {
  dataObject: PropTypes.shape({
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  widthOfTable: PropTypes.string,
  widthOfColums: PropTypes.arrayOf(PropTypes.number).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      func: PropTypes.func,
      icon: PropTypes.elementType,
      label: PropTypes.string,
      condition: PropTypes.func,
    })
  ),
  editRowId: PropTypes.string,
  handleFieldChange: PropTypes.func,
};

TableComponent.defaultProps = {
  widthOfTable: "80%",
  actions: [],
  editRowId: null,
  handleFieldChange: null,
};

export default TableComponent;
