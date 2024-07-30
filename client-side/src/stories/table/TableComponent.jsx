import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import './TableComponent.scss';

const TableComponent = ({ dataObject, widthOfTable = "80%", widthOfColums, actions, editRowId, handleFieldChange, statusOptions = [] }) => {
  let columns = dataObject.headers.map((header, i) => ({
    field: header,
    headerName: header,
    width: widthOfColums[i],
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      if (editRowId && editRowId === params.row.id && header !== 'Actions') {
        if (header === 'status') {
          return (
            <Select
              value={params.value}
              onChange={(e) => handleFieldChange && handleFieldChange(e, params.row.id)}
              name={header}
              fullWidth
            >
              {statusOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          );
        }
        return (
          <TextField
            value={params.value}
            onChange={(e) => handleFieldChange && handleFieldChange(e, params.row.id)}
            name={header}
            fullWidth
          />
        );
      }
      if (header === 'Actions') {
        return (
          <div>
            {actions && actions.filter(action => action.condition(params.row.id)).map((action, index) => (
              <Tooltip key={index} title={action.label}>
                <IconButton onClick={() => action.func(params.row.id)} aria-label={action.label}>
                  {React.createElement(action.icon)}
                </IconButton>
              </Tooltip>
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
            <Tooltip key={index} title={action.label}>
              <IconButton onClick={() => action.func(params.row.id)} aria-label={action.label}>
                {React.createElement(action.icon)}
              </IconButton>
            </Tooltip>
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
  statusOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TableComponent.defaultProps = {
  widthOfTable: "80%",
  actions: [],
  editRowId: null,
  handleFieldChange: null,
};

export default TableComponent;
