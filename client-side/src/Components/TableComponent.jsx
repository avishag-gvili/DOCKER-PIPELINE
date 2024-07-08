
import React from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import './TableComponent.scss'

const TableComponent = ({ dataObject }) => {
 
  return (
    <Table className="table">
      <TableHead>
        <TableRow>
          {dataObject.headers.map((header) => (
            <TableCell>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {dataObject.rows.map((row) => (
          <TableRow>
            {row.cells.map((cell) => (
              <TableCell>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
