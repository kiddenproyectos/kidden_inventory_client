import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';

const MainTable = ({ rows, columns }) => {
  const theme = useTheme();
  /* eslint-disable */
  return (
    <div>
      <DataGrid
        checkboxSelection
        rows={rows}
        columns={columns}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'transparent'
          },
          '& .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: theme.palette.secondary.light
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: theme.palette.secondary.light
          },
          '& .css-1p5pb03-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': {
            color: theme.palette.secondary.main
          }
        }}
      />
    </div>
  );
};

MainTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array
};

export default MainTable;
